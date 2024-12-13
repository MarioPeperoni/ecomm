"use client";

import { useState } from "react";

import ImageCarousel from "@/components/store/gallery/ImageCarousel";
import CarouselPreviews from "@/components/store/gallery/CarouselPreviews";

export default function Gallery({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="space-y-2">
      <ImageCarousel
        images={images}
        indexState={{ currentIndex, setCurrentIndex }}
      />
      <CarouselPreviews
        images={images}
        indexState={{ currentIndex, setCurrentIndex }}
      />
    </div>
  );
}
