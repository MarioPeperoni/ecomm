import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type InputWithIndentProps = React.ComponentProps<typeof Input> & {
  indentvalue: string | React.ReactNode;
  direction: "left" | "right";
};

const InputWithIndent: React.FC<InputWithIndentProps> = (props) => {
  return (
    <div className="flex">
      {props.direction === "left" && (
        <span
          className={cn(
            "flex items-center text-nowrap rounded-l-[--radius] border border-r-0 border-border bg-muted px-3 text-center text-sm",
            props.className,
          )}
        >
          {props.indentvalue}
        </span>
      )}
      <Input
        {...props}
        placeholder="your-store-name"
        className={cn(
          props.direction === "right"
            ? "rounded-r-none border-r-0"
            : "rounded-l-none border-l-0",
        )}
        autoCapitalize="none"
      />
      {props.direction === "right" && (
        <span
          className={cn(
            "flex items-center text-nowrap rounded-r-[--radius] border border-l-0 border-border bg-muted px-3 text-center text-sm",
            props.className,
          )}
        >
          {props.indentvalue}
        </span>
      )}
    </div>
  );
};

export default InputWithIndent;
