import { useState } from "react";
import Image from "next/image";

import { UploadDropzone } from "@/utils/uploadthing/uploadthing";

import { toast } from "@/hooks/use-toast";

import LoadingSpinner from "@/components/loading/LoadingSpinner";

import { Trash2 } from "lucide-react";

import { ControllerRenderProps } from "react-hook-form";

interface BillboardImageUploadProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, string>;
}

export default function BillboardImageUpload({
  field,
}: BillboardImageUploadProps) {
  const [isLoading, setIsLoading] = useState(true);

  return field.value ? (
    <div className="group relative flex w-full items-center justify-center bg-secondary p-1">
      <div className="absolute">
        {isLoading && <LoadingSpinner size={50} />}
      </div>
      <Image
        src={field.value}
        width={970}
        height={250}
        className="h-32 w-full object-cover"
        style={{ aspectRatio: "970 / 250" }}
        alt="banner background image"
        onLoad={() => setIsLoading(false)}
      />
      <div className="absolute right-2 top-2 rounded-lg bg-background/70 p-2 opacity-0 transition hover:cursor-pointer hover:bg-background/90 hover:text-destructive group-hover:opacity-100">
        <Trash2 className="size-4" onClick={() => field.onChange("")} />
      </div>
    </div>
  ) : (
    <UploadDropzone
      appearance={{
        container: "py-4",
        button:
          "ut-ready:bg-primary/90 ut-uploading:bg-primary/60 ut-readying:bg-primary/70 hover:cursor-pointer z-5 !mt-2 focus-within:ring-primary after:ut-uploading:bg-primary",
        label: "hover:text-primary mt-0",
      }}
      endpoint={"imageUploader"}
      onClientUploadComplete={(res) => {
        field.onChange(res[0].url);
        setIsLoading(true);
      }}
      onUploadError={(error: Error) => {
        toast({
          title: "An error occurred during image upload",
          description: error.message,
        });
      }}
    />
  );
}
