"use client";

import { useState } from "react";

import { format } from "date-fns";

import getAproxDelivery from "@/helpers/getAproxDelivery";
import getProductQuantity from "@/helpers/getProductQuantity";

import { Separator } from "@/components/ui/separator";

import ShoppingCartControll from "@/components/store/product/ShoppingCartControll";
import SizeSelect from "@/components/store/product/SizeSelect";

import { Truck } from "lucide-react";

import { ProductExtended } from "@/types/storeExtended";

interface ProductInfoProps {
  product: ProductExtended;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const quantity = getProductQuantity(product.quantity);
  const deliveryDate = getAproxDelivery();

  const [sizeSelected, setSizeSelected] = useState<string | null>(null);

  // Availability text
  const availabilityText =
    quantity > 0
      ? quantity > 50
        ? { text: "Available", color: "text-green-700" }
        : { text: "Last items!", color: "text-orange-600 " }
      : { text: "Out of Stock", color: "text-red-700" };

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary">{product.name}</h1>
      <p className="text-muted-foreground">{product.Category?.name}</p>
      <div className="mt-2 flex flex-col gap-0">
        <p className="text-2xl font-semibold">${product.price}</p>
        <p className="-mt-1 font-light text-muted-foreground">
          Plus $5 shipping
        </p>
      </div>

      <p className={availabilityText.color}>{availabilityText.text}</p>

      <Separator className="my-4" />
      <section className="space-y-2">
        {product.quantity.length > 1 && (
          <SizeSelect
            quantity={product.quantity}
            state={{ sizeSelected, setSizeSelected }}
          />
        )}

        <div className="flex flex-col rounded-[--radius] border border-border p-4">
          <p className="flex gap-2 font-semibold">
            <Truck className="text-primary" />
            {format(deliveryDate[0], "iii dd MMM")}
            {" - "}
            {format(deliveryDate[1], "iii dd MMM")}
          </p>
          <p>Standard delivery</p>
        </div>
        <div className="flex items-center gap-2 rounded-[--radius] border border-border p-4">
          <ShoppingCartControll product={product} size={sizeSelected} />
        </div>
      </section>
    </div>
  );
}
