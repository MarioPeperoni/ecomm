"use client";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

import { ColumnDef } from "@tanstack/react-table";

import BillboardsTableActions from "@/components/admin/billboards/BillboardsTableActions";

import { Billboard } from "@prisma/client";

export const BillboardColumns: ColumnDef<Billboard>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "text",
    header: "Text",
    cell: ({ row }) => {
      if (!row.original.text) {
        return <p className="text-muted-foreground">No text</p>;
      } else {
        return row.original.text;
      }
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) =>
      format(new Date(row.original.updatedAt), "Pp", { locale: enUS }),
  },
  {
    id: "actions",
    cell: ({ row }) => <BillboardsTableActions billboard={row.original} />,
  },
];
