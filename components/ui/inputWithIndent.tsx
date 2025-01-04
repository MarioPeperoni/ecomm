import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type InputWithIndentProps = React.ComponentProps<typeof Input> & {
  indentValue: string | React.ReactNode;
  direction: "left" | "right";
  indentClassName?: string;
  onIndentClick?: () => void;
};

const InputWithIndent: React.FC<InputWithIndentProps> = ({
  indentValue,
  direction,
  onIndentClick,
  indentClassName,
  ...inputProps
}) => {
  const renderIndent = (position: "left" | "right") => (
    <span
      className={cn(
        "flex items-center text-nowrap border bg-muted px-3 text-center text-sm",
        position === "left"
          ? "rounded-l-[--radius] border-r-0"
          : "rounded-r-[--radius] border-l-0",
        indentClassName,
      )}
      onClick={onIndentClick}
    >
      {indentValue}
    </span>
  );

  return (
    <div className="flex">
      {direction === "left" && renderIndent("left")}
      <Input
        {...inputProps}
        className={cn(
          direction === "right"
            ? "rounded-r-none border-r-0"
            : "rounded-l-none border-l-0",
          inputProps.className,
        )}
        autoCapitalize="none"
      />
      {direction === "right" && renderIndent("right")}
    </div>
  );
};

export default InputWithIndent;
