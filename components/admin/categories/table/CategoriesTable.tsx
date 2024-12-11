import { CategoryColumns } from "@/components/admin/categories/table/CategoryTableColumns";
import { DataTable } from "@/components/admin/DataTable";

import { Plus } from "lucide-react";

import { CategoryExtended } from "@/types/storeExtended";

export default function CategoriesTable({
  data,
}: {
  data: CategoryExtended[];
}) {
  const columns = CategoryColumns;

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
    <p className="text-muted-foreground">
      Your store does not have any configured categories
    </p>
    <p className="flex items-center justify-center text-center text-muted-foreground">
      Press &quot;
      <Plus className="size-5" />
      Add New&quot; button to create category
    </p>
  </div>
);
