import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

import { UploadDropzone } from "@/utils/uploadthing/uploadthing";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

import { Trash2 } from "lucide-react";

export default function ProductGallery({
  images,
  onChange,
}: {
  images: string[];
  onChange: (images: string[]) => void;
}) {
  const [loadingIndexes, setLoadingIndexes] = useState<number[]>([]);

  const removeImage = (imageIndex: number) => {
    const newImages = images.filter((_, index) => index !== imageIndex);
    onChange(newImages);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-4">
      <div className="group col-span-2 row-span-2 aspect-[3/4] overflow-hidden rounded-[--radius] bg-secondary">
        {images[0] ? (
          <div className="flex items-center justify-center">
            <div className="absolute">
              {loadingIndexes.includes(0) ? (
                <LoadingSpinner size={50} />
              ) : (
                <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
                  <div
                    className="rounded-[--radius] bg-black/50 p-2 text-white/80 transition hover:cursor-pointer hover:bg-black/60 hover:text-white"
                    onClick={() => removeImage(0)}
                  >
                    <Trash2 />
                  </div>
                </div>
              )}
            </div>
            <Image
              src={images[0]}
              alt="Thumbnail"
              className="h-full w-full object-cover"
              width={900}
              height={1200}
              style={{ aspectRatio: "3 / 4" }}
              onLoad={() =>
                setLoadingIndexes((prev) => prev.filter((i) => i !== 0))
              }
            />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-sm">
            <UploadDropzone
              config={{
                mode: "auto",
              }}
              appearance={{
                container: "py-4 border-0",
                button:
                  "ut-ready:bg-primary/90 ut-uploading:bg-primary/60 ut-readying:bg-primary/70 hover:cursor-pointer z-5 !mt-2 focus-within:ring-primary after:ut-uploading:bg-primary",
                label: "hover:text-primary mt-0",
              }}
              endpoint={"imageUploader"}
              onClientUploadComplete={(res) => {
                onChange([res[0].url, ...images.slice(1)]);
                setLoadingIndexes((prev) => [0, ...prev]);
              }}
              onUploadError={(error: Error) => {
                toast({
                  title: "An error occurred during image upload",
                  description: error.message,
                });
              }}
            />
          </div>
        )}
      </div>

      {Array.from({ length: 4 }).map((_, index) => {
        const imageIndex = index + 1;
        if (images[imageIndex]) {
          return (
            <div
              key={index}
              className="group flex aspect-[3/4] items-center justify-center overflow-hidden rounded-[--radius] bg-secondary"
            >
              <div className="absolute">
                {loadingIndexes.includes(imageIndex) ? (
                  <LoadingSpinner size={50} />
                ) : (
                  <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
                    <div
                      className="rounded-[--radius] bg-black/50 p-2 text-white/80 transition hover:cursor-pointer hover:bg-black/60 hover:text-white"
                      onClick={() => removeImage(imageIndex)}
                    >
                      <Trash2 />
                    </div>
                  </div>
                )}
              </div>
              <Image
                src={images[imageIndex]}
                alt={`Image ${imageIndex + 1}`}
                className="h-full w-full object-cover"
                width={900}
                height={1200}
                style={{ aspectRatio: "3 / 4" }}
                onLoad={() =>
                  setLoadingIndexes((prev) =>
                    prev.filter((i) => i !== imageIndex),
                  )
                }
              />
            </div>
          );
        }
        return (
          <div
            key={index}
            className="flex aspect-[3/4] items-center justify-center rounded-[--radius] bg-secondary"
          >
            <div className="absolute">
              {loadingIndexes.includes(imageIndex) && (
                <LoadingSpinner size={50} />
              )}
            </div>
            {imageIndex === images.length && (
              <UploadDropzone
                className={loadingIndexes.includes(imageIndex) ? "hidden" : ""}
                config={{
                  mode: "auto",
                }}
                appearance={{
                  container: cn("py-4 border-0"),
                  button: "hidden",
                  label: "hidden",
                  uploadIcon: cn(
                    "size-8 hover:text-primary transition hover:cursor-pointer",
                  ),
                  allowedContent: cn("block"),
                }}
                onUploadBegin={() => {
                  setLoadingIndexes((prev) => [...prev, imageIndex]);
                }}
                endpoint={"imageUploader"}
                onClientUploadComplete={(res) => {
                  onChange([...images, res[0].url]);
                }}
                onUploadError={(error: Error) => {
                  toast({
                    title: "An error occurred during image upload",
                    description: error.message,
                  });
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
