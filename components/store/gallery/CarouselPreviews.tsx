import { Dispatch, SetStateAction } from "react";

import { cn } from "@/lib/utils";

import ImageWLoading from "@/components/ui/ImageWLoading";

interface CarouselPreviewsProps {
  images: string[];
  indexState: {
    currentIndex: number;
    setCurrentIndex: Dispatch<SetStateAction<number>>;
  };
}

export default function CarouselPreviews({
  images,
  indexState,
}: CarouselPreviewsProps) {
  return (
    <div className="flex gap-1">
      {images.map((image, index) => (
        <ImageWLoading
          key={index}
          src={image}
          width={100}
          height={100}
          alt="Image preview"
          className={cn(
            "aspect-square cursor-pointer rounded-[--radius] border border-border",
            images[index] === images[indexState?.currentIndex] &&
              "border-2 border-primary",
          )}
          onClick={() => indexState.setCurrentIndex(index)}
        />
      ))}
    </div>
  );
}
