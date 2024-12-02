import { DataTable } from "@/components/admin/DataTable";
import { ProductTableColumns } from "@/components/admin/products/table/ProductsTableColums";

import { ProductExtended } from "@/types/storeExtended";

export default function ProductsTable({ data }: { data: ProductExtended[] }) {
  const columns = ProductTableColumns;

  return <DataTable data={data} columns={columns} />;
}
