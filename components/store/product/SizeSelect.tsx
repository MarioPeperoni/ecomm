"use client";

import { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";

import { Shirt } from "lucide-react";

interface SizeSelectProps {
  quantity: number[];
  state: {
    sizeSelected: string | null;
    setSizeSelected: Dispatch<SetStateAction<string | null>>;
  };
  variant?: "default" | "dialog";
}

export default function SizeSelect({
  quantity,
  state,
  variant = "default",
}: SizeSelectProps) {
  const sizes = ["XS", "S", "M", "L", "XL"];

  if (variant === "dialog") {
    return (
      <div className="flex gap-2">
        {quantity.map((quan, index) => {
          if (quan === 0) {
            return null;
          } else {
            return (
              <Button
                key={sizes[index]}
                variant={
                  state.sizeSelected == sizes[index] ? "default" : "secondary"
                }
                onClick={() => state.setSizeSelected(sizes[index])}
              >
                {sizes[index]}
              </Button>
            );
          }
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-[--radius] border border-border p-4">
      <p className="flex gap-2 font-semibold">
        <Shirt className="text-primary" />
        Size
      </p>
      <div className="mt-2 flex gap-1">
        {/* Size selector */}
        {quantity.map((quan, index) => {
          if (quan === 0) {
            return null;
          } else {
            return (
              <Button
                key={sizes[index]}
                variant={
                  state.sizeSelected == sizes[index] ? "default" : "secondary"
                }
                onClick={() => state.setSizeSelected(sizes[index])}
              >
                {sizes[index]}
              </Button>
            );
          }
        })}
      </div>
    </div>
  );
}
