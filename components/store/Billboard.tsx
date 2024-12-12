import type { Billboard } from "@prisma/client";

export default function Billboard({ billboard }: { billboard: Billboard }) {
  return (
    <div className="overflow-hidden rounded-[--radius] p-4 sm:p-6 lg:p-8">
      <div
        className="relative overflow-hidden rounded-[--radius] bg-cover"
        style={{
          backgroundImage: `url(${billboard.imageUrl})`,
          aspectRatio: "970/250",
        }}
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-8 text-center">
          <p className="max-w-xs text-3xl font-bold text-background sm:max-w-xl sm:text-5xl lg:text-6xl">
            {billboard.text}
          </p>
        </div>
      </div>
    </div>
  );
}
