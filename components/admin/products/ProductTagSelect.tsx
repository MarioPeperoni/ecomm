"use client";

import { useEffect, useState, useTransition } from "react";

import getTags from "@/data/tag";

import { Badge } from "@/components/ui/badge";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

import { TagExtended } from "@/types/storeExtended";
import { Tag } from "@prisma/client";

import { Plus, Trash2 } from "lucide-react";

export default function ProductTagSelect({
  tags,
  onChange,
}: {
  tags: Tag[];
  onChange: (tags: Tag[]) => void;
}) {
  const [tagGroups, setTagGroups] = useState<TagExtended[]>([]);
  const [isFetchin, startFetching] = useTransition();

  useEffect(() => {
    startFetching(async () => {
      let tagGroup = await getTags();

      // Filter out tags that are already in the value
      tagGroup.forEach((tagGroup) => {
        tagGroup.Tags = tagGroup.Tags.filter(
          (tag) => !tags.map((t) => t.name).includes(tag.name),
        );
      });

      // Filter out tag groups that have no tags left
      tagGroup = tagGroup.filter((tagGroup) => tagGroup.Tags.length > 0);

      setTagGroups(tagGroup);
    });
  }, [tags]);

  const onRemove = (tagId: string) => {
    onChange(tags.filter((tag) => tag.id !== tagId));
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border border-border p-2">
      {tags.map((tag) => (
        <ContextMenu key={tag.name}>
          <ContextMenuTrigger>
            <Badge>{tag.name}</Badge>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              className="text-destructive hover:cursor-pointer focus:text-destructive"
              onClick={() => onRemove(tag.id)}
            >
              <Trash2 className="mr-2 size-4" />
              Remove
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Badge variant={"secondary"} className="gap-1 hover:cursor-pointer">
            <Plus className="size-4" />
            {tags.length === 0 && "Add tags"}
          </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {isFetchin && (
            <div className="flex justify-center py-5">
              <LoadingSpinner size={20} />
            </div>
          )}
          {tagGroups.length === 0 && !isFetchin && (
            <DropdownMenuItem disabled>No tags available</DropdownMenuItem>
          )}
          {tagGroups.map((tagGroup, index) => (
            <div key={tagGroup.id}>
              {index !== 0 && <DropdownMenuSeparator />}
              <DropdownMenuLabel>{tagGroup.name}</DropdownMenuLabel>
              {tagGroup.Tags.map((tag) => (
                <DropdownMenuItem
                  key={tag.id}
                  onSelect={() => onChange([...tags, tag])}
                >
                  {tag.name}
                </DropdownMenuItem>
              ))}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
