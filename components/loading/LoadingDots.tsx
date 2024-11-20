import { cn } from "@/lib/utils";

interface LoadingDotsProps {
  containterStyle?: string;
  dotsStyle?: string;
}

const LoadingDots = ({ containterStyle, dotsStyle }: LoadingDotsProps) => (
  <div
    className={cn(
      "-mb-1 -ml-1 flex items-center justify-center space-x-1",
      containterStyle,
    )}
  >
    <span className="sr-only">Loading...</span>
    <div
      className={cn(
        "-m-1 h-2 w-2 animate-bounce rounded-full bg-foreground [animation-delay:-0.3s]",
        dotsStyle,
      )}
    ></div>
    <div
      className={cn(
        "h-2 w-2 animate-bounce rounded-full bg-foreground [animation-delay:-0.15s]",
        dotsStyle,
      )}
    ></div>
    <div
      className={cn(
        "h-2 w-2 animate-bounce rounded-full bg-foreground",
        dotsStyle,
      )}
    ></div>
  </div>
);

export default LoadingDots;
