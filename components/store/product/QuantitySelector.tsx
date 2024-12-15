"use client";

import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface QuantitySelectorProps {
  state: {
    quantity: number;
    setQuantity: Dispatch<SetStateAction<number>>;
  };
}

export default function QuantitySelector({ state }: QuantitySelectorProps) {
  const handleDecrement = () => {
    state.setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrement = () => {
    state.setQuantity((prev) => Math.min(100, prev + 1));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    if (value >= 0 && value <= 100) {
      state.setQuantity(value);
    }
  };

  return (
    <div className="flex">
      <Button
        className="rounded-r-none p-2"
        onClick={handleDecrement}
        disabled={state.quantity === 1}
      >
        -
      </Button>
      <Input
        className="w-16 rounded-none p-0 text-center"
        value={state.quantity}
        onChange={handleInputChange}
      />
      <Button
        className="rounded-l-none p-2"
        onClick={handleIncrement}
        disabled={state.quantity === 100}
      >
        +
      </Button>
    </div>
  );
}
