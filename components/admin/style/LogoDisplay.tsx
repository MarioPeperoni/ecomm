import { UploadButton } from "@/utils/uploadthing/uploadthing";

import { toast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ImageWLoading from "@/components/ui/ImageWLoading";

interface LogoDisplayProps {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
}

export default function LogoDisplay({ field }: LogoDisplayProps) {
  return (
    <Card>
      <CardContent className="relative flex justify-between gap-2 p-4">
        {field.value ? (
          <div className="flex w-full select-none items-center justify-center">
            <div className="absolute right-0 top-0 p-4">
              <Button
                type="button"
                variant={"outline"}
                className="border-destructive text-destructive transition hover:bg-destructive/10 hover:text-destructive"
                onClick={() => field.onChange("")}
              >
                Remove logo
              </Button>
            </div>
            <div className="flex items-end justify-center gap-4">
              <div className="flex flex-col items-center">
                <ImageWLoading
                  src={field.value}
                  alt="Store logo"
                  width={128}
                  height={128}
                  className="object-contain"
                />
                <p className="text-center text-sm text-muted-foreground">
                  128 pixels
                </p>
              </div>
              <div className="flex flex-col items-center">
                <ImageWLoading
                  src={field.value}
                  alt="Store logo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
                <p className="text-center text-sm text-muted-foreground">
                  64 pixels
                </p>
              </div>
              <div className="flex flex-col items-center">
                <ImageWLoading
                  src={field.value}
                  alt="Store logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <p className="text-center text-sm text-muted-foreground">
                  32 pixels
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <UploadButton
              endpoint={"imageUploader"}
              appearance={{
                button:
                  "bg-primary after:ut-uploading:bg-primary focus-within:ring-primary",
                allowedContent: "hidden",
              }}
              onClientUploadComplete={(res) => field.onChange(res[0].url)}
              onUploadError={(error: Error) => {
                toast({
                  title: "An error occurred during image upload",
                  description: error.message,
                });
              }}
            />
            <p className="text-sm text-muted-foreground">No logo uploaded</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
