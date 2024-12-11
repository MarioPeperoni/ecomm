import { DataTable } from "@/components/admin/DataTable";
import { ProductTableColumns } from "@/components/admin/products/table/ProductsTableColums";

import { Plus } from "lucide-react";

import { ProductExtended } from "@/types/storeExtended";

export default function ProductsTable({ data }: { data: ProductExtended[] }) {
  const columns = ProductTableColumns;

  return (
    <DataTable
      data={data}
      columns={columns}
      noDataComponent={<NoDataComponent />}
    />
  );
}

const NoDataComponent = () => (
  <div>
    <p className="text-muted-foreground">Your store does not have any items</p>
    <p className="flex items-center justify-center text-center text-muted-foreground">
      Press &quot;
      <Plus className="size-5" />
      Add New&quot; button to add first item
    </p>
  </div>
);
