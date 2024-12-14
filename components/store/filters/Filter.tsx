"use client";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

import { Badge } from "@/components/ui/badge";

import { TagExtended } from "@/types/storeExtended";

interface FilterProps {
  tagGroup: TagExtended;
}

export default function Filter({ tagGroup }: FilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValues = searchParams.get(tagGroup.id)?.split(",") || [];

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());
    let currentUrl = new URL(window.location.href);

    let selectedTags = selectedValues.includes(id)
      ? selectedValues.filter((tag) => tag !== id) // Remove tag if already selected
      : [...selectedValues, id]; // Add tag to the selected list

    // If no tags are selected, treat it as if all tags are selected
    if (selectedTags.length === 0) {
      delete current[tagGroup.id];
      currentUrl.searchParams.delete(tagGroup.id);
    } else {
      current[tagGroup.id] = selectedTags.join(",");
    }

    console.log(current);

    const url = qs.stringifyUrl(
      {
        url: currentUrl.pathname,
        query: current,
      },
      { skipNull: true },
    );

    router.push(url);
  };

  const resetFilters = () => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete(tagGroup.id);
    router.push(currentUrl.pathname);
  };

  return (
    <div className="mb-2 lg:mb-8">
      <div className="flex items-center justify-between gap-1">
        <h3 className="font-semibold text-primary lg:text-lg">
          {tagGroup.name}
        </h3>
        {selectedValues.length > 0 && (
          <span
            className="cursor-pointer select-none text-[12px] text-muted-foreground"
            onClick={resetFilters}
          >
            Clear
          </span>
        )}
      </div>
      <hr className="my-2 hidden lg:block" />
      <div className="mt-2 flex flex-wrap gap-2">
        {tagGroup.Tags.map((tag) => (
          <div key={tag.id} className="flex items-center">
            <Badge
              variant={selectedValues.includes(tag.id) ? "default" : "outline"}
              className="cursor-pointer p-2"
              onClick={() => onClick(tag.id)}
            >
              {tag.name}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
