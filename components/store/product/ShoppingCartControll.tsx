"use client";

import { useState } from "react";

import { useCart } from "@/hooks/use-cart";

import QuantitySelector from "@/components/store/product/QuantitySelector";

import { Button } from "@/components/ui/button";

import { ProductExtended } from "@/types/storeExtended";

import { ShoppingBasket } from "lucide-react";

interface ShoppingCartControllProps {
  product: ProductExtended;
  size: string | null | undefined;
}

export default function ShoppingCartControll({
  product,
  size,
}: ShoppingCartControllProps) {
  const [quantity, setQuantity] = useState(1);
  const cart = useCart();

  const handleAddToCart = () => {
    cart.addItem(product, quantity, size);
  };

  return (
    <>
      <QuantitySelector state={{ quantity, setQuantity }} />
      <Button
        className="w-full p-2"
        disabled={product.quantity.length > 1 && size === null}
        onClick={handleAddToCart}
      >
        <ShoppingBasket />
        Add to Cart
      </Button>
    </>
  );
}
