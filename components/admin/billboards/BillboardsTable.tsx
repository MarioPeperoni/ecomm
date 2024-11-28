import { BillboardColumns } from "@/components/admin/billboards/BillboardsTableColumns";
import { DataTable } from "@/components/admin/DataTable";

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
    <p className="text-lg font-semibold">
      Your store does not have any configured billboards
    </p>
    <p>Press &quot;Add New&quot; button to create billboard</p>
  </div>
);
