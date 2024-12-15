"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import getProductQuantity, {
  getProductQuantityForSize,
} from "@/helpers/getProductQuantity";

import { useCart } from "@/hooks/use-cart";
import { toast } from "@/hooks/use-toast";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { ShoppingCart } from "lucide-react";

export default function CartSummary() {
  const router = useRouter();
  const items = useCart((state) => state.items);

  const [canCheckout, setCanCheckout] = useState(false);

  useEffect(() => {
    const isOutOfStock = items.some((item) => {
      // Check if the quantity is an array (for sizes)
      if (item.quantity.length > 1) {
        return (
          item.cartQuantity >
          getProductQuantityForSize(item.quantity, item.size!)
        );
      }

      return item.cartQuantity > getProductQuantity(item.quantity);
    });

    setCanCheckout(!isOutOfStock);
  }, [items]);

  const itemCount = items.reduce((acc, item) => {
    return acc + item.cartQuantity;
  }, 0);

  const itemsTotal = items.reduce((acc, item) => {
    return acc + item.cartQuantity * item.price;
  }, 0);

  const totalPrice = itemsTotal + 5;

  const handleRedirect = () => {
    if (canCheckout) {
      router.push("/checkout");
    } else {
      toast({
        title: "Some items are out of stock",
        description: "Please remove them from your cart to continue",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-16 rounded-[--radius] bg-muted/80 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="font-mdium text-lg">Order Summary</h2>
      <div className="mt-6">
        <div className="flex items-center justify-between text-muted-foreground">
          <div className="text-base font-medium">Items total ({itemCount})</div>
          <span className="font-semibold">
            {items.length !== 0 ? `$${itemsTotal}` : `-`}
          </span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground">
          <div className="text-base font-medium">Shipment fee</div>
          <span className="font-semibold">
            {items.length !== 0 ? `$5` : `-`}
          </span>
        </div>
        <Separator className="my-4" />
        <div className="flex items-center justify-between">
          <div className="text-base font-medium">Order total</div>
          <span className="font-semibold">
            {items.length !== 0 ? `$${totalPrice}` : `-`}
          </span>
        </div>
        <Button
          className="mt-4 w-full"
          disabled={items.length === 0 || !canCheckout}
          onClick={() => handleRedirect()}
        >
          <ShoppingCart />
          Checkout
        </Button>
      </div>
    </div>
  );
}
