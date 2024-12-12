import { cn } from "@/lib/utils";

import Image from "next/image";

type ImageWLoadingProps = React.ComponentProps<typeof Image>;

const ImageWLoading: React.FC<ImageWLoadingProps> = (props) => (
  <Image
    {...props}
    data-loaded="false"
    onLoad={(event) => {
      event.currentTarget.setAttribute("data-loaded", "true");
    }}
    className={cn(
      "data-[loaded=false]:animate-pulse data-[loaded=false]:bg-muted",
      props.className,
    )}
  />
);

export default ImageWLoading;
