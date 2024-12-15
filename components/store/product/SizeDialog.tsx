"use client";

import { useState } from "react";

import { useCart } from "@/hooks/use-cart";

import SizeSelect from "@/components/store/product/SizeSelect";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { ShoppingBasket } from "lucide-react";

import { ProductExtended } from "@/types/storeExtended";

interface SizeDialogProps {
  product: ProductExtended;
  closeDialog: () => void;
}

export default function SizeDialog({ product, closeDialog }: SizeDialogProps) {
  const [sizeSelected, setSizeSelected] = useState<string | null>(null);
  const cart = useCart();

  const handleAddToCart = () => {
    cart.addItem(product, 1, sizeSelected);
    closeDialog();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pick a size</DialogTitle>
      </DialogHeader>
      <SizeSelect
        quantity={product.quantity}
        state={{ sizeSelected, setSizeSelected }}
        variant="dialog"
      />
      <Button
        className="w-full p-2"
        disabled={sizeSelected === null}
        onClick={handleAddToCart}
      >
        <ShoppingBasket />
        Add to Cart
      </Button>
    </DialogContent>
  );
}
