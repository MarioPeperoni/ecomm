import Link from "next/link";

import { Button } from "@/components/ui/button";

import { ProductExtended } from "@/types/storeExtended";

import { ScanBarcode } from "lucide-react";

export default function ProductsTableActions({
  item,
}: {
  item: ProductExtended;
}) {
  return (
    <div className="flex justify-end">
      <Link href={`/admin/dashboard/products/${item.id}`}>
        <Button variant={"secondary"} className="font-bold hover:bg-primary/20">
          <ScanBarcode />
          Menage product
        </Button>
      </Link>
    </div>
  );
}
