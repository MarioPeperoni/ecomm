"use client";

import { useEffect, useState } from "react";

import { useCart } from "@/hooks/use-cart";

import { Button } from "@/components/ui/button";
import ImageWLoading from "@/components/ui/ImageWLoading";

import QuantitySelector from "@/components/store/product/QuantitySelector";

import { CartProduct } from "@/types/storeExtended";

interface CartItemProps {
  item: CartProduct;
}

export default function CartItem({ item }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantityInCart);

  const cart = useCart();
  const onRemove = () => {
    cart.removeItem(item.id, item.size);
  };

  useEffect(() => {
    cart.setQuantity(item.id, quantity, item.size);
  }, [quantity]);

  return (
    <li className="flex py-6">
      <div className="relative aspect-[3/4] w-24 overflow-hidden rounded-[--radius] sm:w-32">
        <ImageWLoading
          src={item.imagesUrl[0]}
          alt={`${item.name} image preview`}
          width={900}
          height={1200}
          style={{ aspectRatio: "3/4" }}
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute right-0 top-0 z-10"></div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-lg font-semibold text-primary">
              {item.name} {item.size && `(${item.size})`}
            </p>
            <p className="font-semibold">${item.price}</p>
          </div>
          <div className="flex items-start gap-2">
            <QuantitySelector state={{ quantity, setQuantity }} />

            <Button variant="default" onClick={onRemove} className="p-3">
              Remove
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
}
