import Stripe from "stripe";

import { headers } from "next/headers";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.WEBHOOK_STRIPE_SECRET!,
    );
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(`Webhook Error: ${error.message}`, {
        status: 400,
      });
    } else {
      return new NextResponse("Webhook Error: Unknown error", {
        status: 400,
      });
    }
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents
    .filter((component) => component)
    .join(", ");

  if (event.type === "checkout.session.completed") {
    const order = await prismadb.order.update({
      where: {
        id: session.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session.customer_details?.phone || "",
      },
      include: {
        OrderItems: true,
      },
    });

    // Iterate through each order item to update product quantities
    for (const item of order.OrderItems) {
      const product = await prismadb.product.findUnique({
        where: {
          id: item.productId,
        },
      });

      if (!product || !Array.isArray(product.quantity)) {
        console.error(
          `Invalid product or quantity for product ID: ${item.productId}`,
        );
        continue;
      }

      // Find the index of the size in the quantity array
      let sizeIndex = 0;

      if (product.quantity.length > 1) {
        sizeIndex = ["XS", "S", "M", "L", "XL"].indexOf(item.size);

        if (sizeIndex === -1 || sizeIndex >= product.quantity.length) {
          console.error(
            `Invalid size "${item.size}" for product ID: ${item.productId}`,
          );
          continue;
        }
      }

      // Decrement the quantity for the specific size
      product.quantity[sizeIndex] -= item.quantity;

      // Ensure no negative values
      if (product.quantity[sizeIndex] < 0) {
        product.quantity[sizeIndex] = 0;
      }

      // Update the product in the database
      await prismadb.product.update({
        where: {
          id: item.productId,
        },
        data: {
          quantity: product.quantity,
        },
      });
    }

    return new NextResponse(null, { status: 200 });
  } else {
    return new NextResponse(null, { status: 200 });
  }
}
