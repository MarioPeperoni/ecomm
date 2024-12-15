"use client";

import { useCart } from "@/hooks/use-cart";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { ShoppingCart } from "lucide-react";

export default function CartSummary() {
  const items = useCart((state) => state.items);

  const itemCount = items.reduce((acc, item) => {
    return acc + item.quantityInCart;
  }, 0);

  const itemsTotal = items.reduce((acc, item) => {
    return acc + item.quantityInCart * item.price;
  }, 0);

  const totalPrice = itemsTotal + 5;

  const onCheckout = () => {
    console.log("Checkout");
  };

  return (
    <div className="mt-16 rounded-[--radius] bg-muted/80 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="font-mdium text-lg">Order Summary</h2>
      <div className="mt-6">
        <div className="flex items-center justify-between text-muted-foreground">
          <div className="text-base font-medium">Items total ({itemCount})</div>
          <span className="font-semibold">${itemsTotal}</span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground">
          <div className="text-base font-medium">Shipment fee</div>
          <span className="font-semibold">$5</span>
        </div>
        <Separator className="my-4" />
        <div className="flex items-center justify-between">
          <div className="text-base font-medium">Order total</div>
          <span className="font-semibold">${totalPrice}</span>
        </div>
        <Button className="mt-4 w-full" onClick={onCheckout}>
          <ShoppingCart />
          Checkout
        </Button>
      </div>
    </div>
  );
}
