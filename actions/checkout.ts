"use server";

import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

import getDomain from "@/data/domain";

import getProductQuantity, {
  getProductQuantityForSize,
} from "@/helpers/getProductQuantity";

import { CartProduct } from "@/types/storeExtended";

export default async function checkout(products: CartProduct[]) {
  try {
    const domain = await getDomain();

    const store = await prismadb.store.findFirst({
      where: {
        domain,
      },
    });

    if (!store) {
      throw new Error("Store not found");
    }

    if (!products || products.length === 0) {
      throw new Error("No products in cart");
    }

    const dbProducts = await prismadb.product.findMany({
      where: {
        storeId: store.id,
        id: {
          in: products.map((product) => product.id),
        },
      },
    });

    for (const product of products) {
      const dbProduct = dbProducts.find(
        (dbProduct) => dbProduct.id === product.id,
      );

      if (!dbProduct) {
        throw new Error(`Product ${product.name} not found`);
      }

      if (dbProduct.quantity.length > 1 && !product.size) {
        throw new Error(`Product ${product.name} requires a size`);
      }

      if (dbProduct.quantity.length === 1 && product.size) {
        throw new Error(`Product ${product.name} does not have sizes`);
      }

      if (getProductQuantity(dbProduct.quantity) < product.cartQuantity) {
        throw new Error(`Product ${product.name} out of stock`);
      }

      if (dbProduct.quantity.length > 1) {
        const quantity = getProductQuantityForSize(
          dbProduct.quantity,
          product.size!,
        );

        if (quantity < product.cartQuantity) {
          throw new Error(
            `Product ${product.name} - ${product.size} out of stock`,
          );
        }
      }
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    products.forEach((product) => {
      line_items.push({
        quantity: product.cartQuantity,
        price_data: {
          currency: "usd",
          product_data: {
            name: `${product.name}${product.size ? ` (${product.size})` : ""}`,
            images: [product.imagesUrl[0]],
          },
          unit_amount: product.price * 100,
        },
      });
    });

    const order = await prismadb.order.create({
      data: {
        storeId: store.id,
        isPaid: false,
        OrderItems: {
          createMany: {
            data: products.map((product) => ({
              price: product.price,
              quantity: product.cartQuantity,
              size: product.size || "",
              productId: product.id,
            })),
          },
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `http://${domain}.localhost:3000/checkout?success=true&orderId=${order.id}`,
      cancel_url: `http://${domain}.localhost:3000/checkout?success=false&orderId=${order.id}&error=Cancelled`,
      metadata: {
        orderId: order.id,
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 500,
              currency: "usd",
            },
            display_name: "Standard Shipping",
            delivery_estimate: {
              minimum: {
                unit: "day",
                value: 1,
              },
              maximum: {
                unit: "day",
                value: 2,
              },
            },
          },
        },
      ],
    });

    return { success: true, sessionId: session.id, url: session.url };
  } catch (error: any) {
    return { error: error.message };
  }
}
