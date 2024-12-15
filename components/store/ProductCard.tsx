"use client";

import { MouseEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

import { useCart } from "@/hooks/use-cart";

import ImageWLoading from "@/components/ui/ImageWLoading";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";

import SizeDialog from "@/components/store/product/SizeDialog";

import { ProductExtended } from "@/types/storeExtended";

import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: ProductExtended;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [sizesDialogOpen, setSizesDialogOpen] = useState(false);

  const router = useRouter();
  const cart = useCart();

  const handleClick = () => {
    if (sizesDialogOpen) return;

    router.push(`/product/${product.id}`);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    // Open sizes dialog if product has more than one size
    if (product.quantity.length > 1) {
      setSizesDialogOpen(true);
      return;
    }

    // Add product without size to cart
    cart.addItem(product, 1, undefined);
  };

  return (
    <>
      <div
        className="group flex cursor-pointer flex-col gap-4 rounded-[--radius] border border-primary/15 bg-background p-3"
        onClick={handleClick}
      >
        <div className="relative rounded-[--radius]">
          <ImageWLoading
            src={product.imagesUrl[0]}
            alt=""
            width={900}
            height={1200}
            style={{ aspectRatio: "3/4" }}
          />
          <div className="absolute bottom-5 w-full px-6 opacity-0 transition group-hover:opacity-100">
            <div className="flex justify-center gap-x-4">
              <Dialog open={sizesDialogOpen} onOpenChange={setSizesDialogOpen}>
                <Button
                  variant={"secondary"}
                  className="size-8 p-2 shadow-md transition hover:scale-110 hover:bg-secondary"
                  onClick={onAddToCart}
                >
                  <ShoppingCart className="text-muted-foreground" size={40} />
                </Button>
                <SizeDialog
                  product={product}
                  closeDialog={() => setSizesDialogOpen(false)}
                />
              </Dialog>
            </div>
          </div>
        </div>
        {/* Item info */}
        <div>
          <p className="text-lg font-semibold">{product.name}</p>
          <p className="text-sm text-muted-foreground">
            {product.Category?.name}
          </p>
        </div>
        {/* Price */}
        <div className="mt-auto flex items-center justify-between">
          <p className="text-lg font-semibold text-primary">${product.price}</p>
        </div>
      </div>
    </>
  );
}
