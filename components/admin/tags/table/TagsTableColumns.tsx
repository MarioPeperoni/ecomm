"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

import TagsTableActions from "@/components/admin/tags/table/TagsTableActions";

import { Tag } from "@prisma/client";
import { TagExtended } from "@/types/storeExtended";

const TagsColumns: ColumnDef<TagExtended>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <p className="font-semibold">{row.original.name}</p>,
  },
  {
    accessorKey: "Tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags = row.original.Tags as Tag[];
      return (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge key={tag.id}>{tag.name}</Badge>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <TagsTableActions tagGroup={row.original} />,
  },
];

export default TagsColumns;
