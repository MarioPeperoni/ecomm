"use client";

import { useRouter } from "next/navigation";

import ImageWLoading from "@/components/ui/ImageWLoading";
import { Button } from "@/components/ui/button";

import { ProductExtended } from "@/types/storeExtended";

import { Expand, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: ProductExtended;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${product.id}`);
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
              <Button
                variant={"secondary"}
                className="size-8 p-2 shadow-md transition hover:scale-110 hover:bg-secondary"
              >
                <Expand className="text-muted-foreground" />
              </Button>
              <Button
                variant={"secondary"}
                className="size-8 p-2 shadow-md transition hover:scale-110 hover:bg-secondary"
              >
                <ShoppingCart className="text-muted-foreground" size={40} />
              </Button>
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
