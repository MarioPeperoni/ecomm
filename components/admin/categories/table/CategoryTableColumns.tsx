"use client";

import { ColumnDef } from "@tanstack/react-table";

import CategoryTableActions from "@/components/admin/categories/table/CategoriesTableActions";

import { CategoryExtended } from "@/types/storeExtended";

export const CategoryColumns: ColumnDef<CategoryExtended>[] = [
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => <p className="font-semibold">{row.original.name}</p>,
  },
  {
    id: "billboard",
    header: "Billboard",
    cell: ({ row }) => {
      return row.original.Billboard ? (
        row.original.Billboard.label
      ) : (
        <p className="text-muted-foreground">No billboard</p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CategoryTableActions category={row.original} />,
  },
];
