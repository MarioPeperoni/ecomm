"use client";

import Image from "next/image";

import { format } from "date-fns";
import { enUS } from "date-fns/locale";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

import { OrderExtended } from "@/types/storeExtended";

export const OrderColumns: ColumnDef<OrderExtended>[] = [
  {
    id: "products",
    header: "Order detalis",
    cell: ({ row }) => {
      return (
        <>
          <p className="mb-2 text-xs text-muted-foreground">
            ID: {row.original.id}
          </p>
          <div className="flex flex-col gap-2">
            {row.original.OrderItems.map((item) => {
              const imageUrl = item.Product.imagesUrl[0];

              return (
                <div key={item.id} className="flex items-center gap-1">
                  {imageUrl ? (
                    <>
                      <Image
                        src={imageUrl}
                        alt={`${item.Product.name} product image`}
                        width={40}
                        height={40}
                        className={`h-auto w-12 rounded-[--radius] object-cover transition-opacity duration-300`}
                        style={{ aspectRatio: "3 / 4" }}
                      />
                    </>
                  ) : (
                    <p
                      style={{ aspectRatio: "3 / 4" }}
                      className="flex w-12 select-none items-center justify-center bg-secondary text-center text-xs text-muted-foreground"
                    >
                      No preview
                    </p>
                  )}

                  <p className="ml-5 font-semibold">{item.Product.name}</p>
                  {item.size && <Badge className="px-1">{item.size}</Badge>}
                  <p className="font-mono font-semibold text-primary">
                    ({item.quantity})
                  </p>
                </div>
              );
            })}
          </div>
        </>
      );
    },
  },
  {
    id: "itemCount",
    header: "Item count",
    cell: ({ row }) => {
      const items = row.original.OrderItems;
      const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

      return <p className="font-semibold">{itemCount}</p>;
    },
  },
  {
    id: "priceTotal",
    header: "Total",
    cell: ({ row }) => {
      const items = row.original.OrderItems;
      const priceTotal = items.reduce((acc, item) => {
        const price = item.price * item.quantity;
        return acc + price;
      }, 0);

      return <p className="font-semibold text-primary">${priceTotal}</p>;
    },
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) =>
      row.original.isPaid ? (
        <Badge className="bg-green-700">Paid</Badge>
      ) : (
        <Badge variant={"secondary"}>Not paid</Badge>
      ),
  },
  {
    id: "createdAt",
    header: "Order date",
    cell: ({ row }) =>
      format(new Date(row.original.createdAt), "Pp", { locale: enUS }),
  },
];
