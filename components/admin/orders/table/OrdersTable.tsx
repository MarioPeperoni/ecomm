import { OrderColumns } from "@/components/admin/orders/table/OrderColumns";
import { DataTable } from "@/components/admin/DataTable";

import { OrderExtended } from "@/types/storeExtended";

export default function OrdersTable({ data }: { data: OrderExtended[] }) {
  const columns = OrderColumns;

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
      You have not received any orders yet
    </p>
  </div>
);
