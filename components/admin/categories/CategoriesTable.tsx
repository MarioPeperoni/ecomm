import { CategoryColumns } from "@/components/admin/categories/CategoryTableColumns";
import { DataTable } from "@/components/admin/DataTable";

import { CategoryExtended } from "@/types/storeExtended";

export default function CategoriesTable({
  data,
}: {
  data: CategoryExtended[];
}) {
  const columns = CategoryColumns;

  return <DataTable data={data} columns={columns} />;
}
