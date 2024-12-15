import Image from "next/image";

import { cn } from "@/lib/utils";

type ImageWLoadingProps = React.ComponentProps<typeof Image>;

const ImageWLoading: React.FC<ImageWLoadingProps> = (props) => (
  <Image
    {...props}
    alt={props.alt || ""}
    data-loaded="false"
    onLoad={(event) => {
      event.currentTarget.setAttribute("data-loaded", "true");
    }}
    className={cn(
      "object-cover data-[loaded=false]:animate-pulse data-[loaded=false]:bg-muted",
      props.className,
    )}
  />
);

export default ImageWLoading;
