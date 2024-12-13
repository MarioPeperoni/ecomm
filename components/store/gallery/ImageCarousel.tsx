"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { cn } from "@/lib/utils";

import ImageWLoading from "@/components/ui/ImageWLoading";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  indexState?: {
    currentIndex: number;
    setCurrentIndex: Dispatch<SetStateAction<number>>;
  };
}

const ImageCarousel = ({ images, indexState }: ImageCarouselProps) => {
  const [localCurrentIndex, setLocalCurrentIndex] = useState(0);
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);

  // Determine currentIndex and setCurrentIndex based on whether indexState is provided
  const currentIndex = indexState?.currentIndex ?? localCurrentIndex;
  const setCurrentIndex = indexState?.setCurrentIndex ?? setLocalCurrentIndex;

  const handleNext = () => {
    if (images && currentIndex < images.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="group relative flex h-full items-center justify-center overflow-hidden rounded-[--radius] bg-muted">
      {/* Image Slider */}
      <div className="relative h-auto w-full items-center self-center overflow-hidden">
        <div
          className="flex items-center transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images &&
            images.map((image, index) => (
              <div
                key={index}
                className="relative h-full flex-shrink-0"
                style={{ width: "100%" }}
              >
                <ImageWLoading
                  src={image}
                  width={900}
                  height={1200}
                  alt={`Image ${index + 1}`}
                  className="!object-contain"
                  style={{ aspectRatio: "3 / 4" }}
                />
              </div>
            ))}
        </div>
      </div>

      {images && (
        <>
          {/* Previous Button */}
          <button
            className={cn(
              "absolute left-2 z-10 rounded-[--radius] bg-background p-1 text-foreground opacity-0 transition-all group-hover:opacity-80",
              currentIndex === 0 && "text-muted-foreground",
            )}
            onClick={handlePrev}
            onMouseEnter={() => setHoverSide("left")}
            onMouseLeave={() => setHoverSide(null)}
          >
            <ChevronLeft />
          </button>

          {/* Left Dim Effect */}
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-primary/10 to-transparent opacity-0 transition-all duration-300 ease-in-out",
              hoverSide === "left" && currentIndex !== 0 && "opacity-100",
            )}
          />

          {/* Right Dim Effect */}
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-primary/10 to-transparent opacity-0 transition-all duration-300 ease-in-out",
              hoverSide === "right" &&
                currentIndex !== images.length - 1 &&
                "opacity-100",
            )}
          />

          {/* Next Button */}
          <button
            className={cn(
              "absolute right-2 z-20 rounded-[--radius] bg-background p-1 text-foreground opacity-0 transition-all group-hover:opacity-80",
              currentIndex === images.length - 1 && "text-muted-foreground",
            )}
            onClick={handleNext}
            onMouseEnter={() => setHoverSide("right")}
            onMouseLeave={() => setHoverSide(null)}
          >
            <ChevronRight />
          </button>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
