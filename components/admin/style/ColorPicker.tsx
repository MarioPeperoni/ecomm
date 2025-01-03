import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";

import { Check } from "lucide-react";

interface ColorPickerProps {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
}

export default function ColorPicker({ field }: ColorPickerProps) {
  const templateColors = [
    "#1F3A93", // Dark Blue
    "#22A7F0", // Light Blue
    "#4ECDC4", // Turquoise
    "#A2DED0", // Light Turquoise
    "#F39C12", // Orange
    "#FDE3A7", // Light Orange
    "#D64541", // Red
    "#F1A9A0", // Light Red
    "#2ECC71", // Green
    "#A9DFBF", // Light Green
    "#9B59B6", // Purple
    "#D2B4DE", // Light Purple
  ];

  return (
    <div className="rounded-[--radius] border bg-card text-card-foreground shadow-sm">
      <div className="flex gap-2 p-4">
        {templateColors.map((color) => (
          <div
            key={color.replace("#", "")}
            className="group relative size-10 rounded-[--radius] hover:cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => field.onChange(color.replace("#", ""))}
          >
            <Check
              className={cn(
                "visible absolute left-2 top-2 text-secondary transition-transform group-hover:scale-125",
                field.value !== color.replace("#", "") && "invisible",
              )}
            />
          </div>
        ))}
        <div className="flex">
          <span className="flex select-none items-center rounded-l-[--radius] border border-r-0 border-border bg-secondary px-4 text-center text-lg text-muted-foreground">
            #
          </span>
          <Input
            className="w-40 rounded-none rounded-r-[--radius] border-l-0"
            value={field.value}
            onChange={(event) => field.onChange(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
