"use client";

import { format } from "date-fns";
import { enUS } from "date-fns/locale";

import { ColumnDef } from "@tanstack/react-table";

import ImageWLoading from "@/components/ui/ImageWLoading";

import BillboardsTableActions from "@/components/admin/billboards/table/BillboardsTableActions";

import { Billboard } from "@prisma/client";

export const BillboardColumns: ColumnDef<Billboard>[] = [
  {
    accessorKey: "preview",
    header: "Banner preview",
    size: 200,
    cell: ({ row }) => {
      if (!row.original.imageUrl) {
        return <p className="text-muted-foreground">No preview</p>;
      } else {
        return (
          <div className="w-32">
            <ImageWLoading
              src={row.original.imageUrl}
              alt={`${row.original.label} banner preview`}
              width={970}
              height={250}
              className="h-auto w-full object-cover"
              style={{
                aspectRatio: "970 / 250",
              }}
            />
          </div>
        );
      }
    },
  },
  {
    accessorKey: "label",
    header: "Label",
    cell: ({ row }) => <p className="font-semibold">{row.original.label}</p>,
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
