import getOrders from "@/data/order";

import DashHeader from "@/components/admin/dashboard/DashHeader";
import OrdersTable from "@/components/admin/orders/table/OrdersTable";

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <>
      <DashHeader title="Orders" subtitle="Menage your orders" />
      <section className="mx-2">
        <OrdersTable data={orders} />
      </section>
    </>
  );
}
