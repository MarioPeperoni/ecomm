"use client";

import { ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ShoppingCart } from "lucide-react";

interface ShoppingCartControllProps {
  size: string | null | undefined;
}

export default function ShoppingCartControll({
  size,
}: ShoppingCartControllProps) {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(100, prev + 1));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    if (value >= 0 && value <= 100) {
      setQuantity(value);
    }
  };

  return (
    <>
      <div className="flex">
        <Button
          className="rounded-r-none p-2"
          onClick={handleDecrement}
          disabled={quantity === 1}
        >
          -
        </Button>
        <Input
          className="w-16 rounded-none p-0 text-center"
          value={quantity}
          onChange={handleInputChange}
        />
        <Button
          className="rounded-l-none p-2"
          onClick={handleIncrement}
          disabled={quantity === 100}
        >
          +
        </Button>
      </div>
      <Button className="w-full p-2" disabled={size === null}>
        <ShoppingCart />
        Add to Cart
      </Button>
    </>
  );
}
