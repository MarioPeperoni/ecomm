"use client";

import { useEffect, useState } from "react";

import { useCart } from "@/hooks/use-cart";

import CartSummary from "@/components/store/cart/CartSummary";
import CartItem from "@/components/store/cart/CartItem";

import { Separator } from "@/components/ui/separator";
import Container from "@/components/ui/Container";

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false);

  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <div className="mt-6 gap-x-12 lg:grid lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              {cart.items.length === 0 ? (
                <p className="text-muted-foreground">No items added to cart</p>
              ) : (
                <ul>
                  {cart.items.map((item, index) => (
                    <div key={item.id + item.size}>
                      <CartItem item={item} />
                      {cart.items.length !== index + 1 && <Separator />}
                    </div>
                  ))}
                </ul>
              )}
            </div>
            <CartSummary />
          </div>
        </div>
      </Container>
    </div>
  );
}
