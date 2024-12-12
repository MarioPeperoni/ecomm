"use client";

import { format } from "date-fns";
import { enUS } from "date-fns/locale";

import { Badge } from "@/components/ui/badge";
import ImageWLoading from "@/components/ui/ImageWLoading";

import ProductsTableActions from "@/components/admin/products/table/ProductsTableActions";

import { ColumnDef } from "@tanstack/react-table";
import { ProductExtended } from "@/types/storeExtended";

export const ProductTableColumns: ColumnDef<ProductExtended>[] = [
  {
    id: "preview",
    size: 140,
    cell: ({ row }) => (
      <div className="w-20 bg-secondary">
        {row.original.imagesUrl[0] ? (
          <ImageWLoading
            src={row.original.imagesUrl[0]}
            alt={`${row.original.name} variant image`}
            width={900}
            height={1200}
            className="h-auto w-full rounded-[--radius] object-cover"
            style={{ aspectRatio: "3 / 4" }}
          />
        ) : (
          <p
            style={{ aspectRatio: "3 / 4" }}
            className="flex select-none items-center justify-center text-muted-foreground"
          >
            No preview
          </p>
        )}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",

    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {(row.original.price === 0 || !row.original.Category) && (
          <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary">
            Draft
          </Badge>
        )}
        {row.original.isFeatured && (
          <Badge className="bg-orange-400 hover:bg-orange-300">Featured</Badge>
        )}
        <p className="font-semibold">{row.original.name}</p>
      </div>
    ),
  },
  {
    accessorKey: "Category.name",
    header: "Category",
    cell: ({ row }) =>
      row.original.Category ? (
        <p>{row.original.Category.name}</p>
      ) : (
        <p className="font-semibold text-destructive">Not set</p>
      ),
  },
  {
    header: "Tags",
    cell: ({ row }) => {
      const tags = row.original.Tags;
      return (
        <div className="flex flex-col flex-wrap items-start justify-center gap-1">
          {tags.map((tag) => (
            <Badge key={tag.id}>{tag.name}</Badge>
          ))}
        </div>
      );
    },
  },
  {
    header: "Quantity",
    cell: ({ row }) => {
      const quantity = row.original.quantity.reduce(
        (acc, curr) => acc + curr,
        0,
      );

      return <p>{quantity}</p>;
    },
  },
  {
    header: "Price",
    accessorKey: "price",
    cell: ({ row }) => (
      <p className="font-semibold text-primary">${row.original.price}</p>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) =>
      format(new Date(row.original.updatedAt), "Pp", { locale: enUS }),
  },
  {
    id: "actions",
    cell: ({ row }) => <ProductsTableActions item={row.original} />,
  },
];
