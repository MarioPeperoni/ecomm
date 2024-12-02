import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

const SizesToggleInput = ({
  value,
  onChange,
  size,
  index,
}: {
  value: number[];
  onChange: (value: number[]) => void;
  size: string;
  index: number;
}) => {
  return (
    <div className="flex">
      <div className="flex items-center justify-center gap-2 border border-r-0 border-border bg-secondary p-2">
        <Checkbox
          checked={value[index] > 0}
          disabled
          className="disabled:opacity-100 disabled:hover:cursor-default"
        />
        <p className="font-mono font-bold text-muted-foreground">{size}</p>
      </div>
      <Input
        className={cn("h-full", value[index] === 0 && "text-muted-foreground")}
        placeholder="0"
        value={value[index]}
        onChange={(e) => {
          const newValue = [...value];
          newValue[index] = parseInt(e.target.value, 10) || 0;
          onChange(newValue);
        }}
      />
    </div>
  );
};

export default SizesToggleInput;
