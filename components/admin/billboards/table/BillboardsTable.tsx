import { BillboardColumns } from "@/components/admin/billboards/table/BillboardsTableColumns";
import { DataTable } from "@/components/admin/DataTable";

import { Plus } from "lucide-react";

import { Billboard } from "@prisma/client";

export default function BillboardsTable({ data }: { data: Billboard[] }) {
  const columns = BillboardColumns;

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
      Your store does not have any configured billboards
    </p>
    <p className="flex items-center justify-center text-center text-muted-foreground">
      Press &quot;
      <Plus className="size-5" />
      Add New&quot; button to create billboard
    </p>
  </div>
);
