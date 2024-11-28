import getBillboards from "@/data/bilboard";

import AddNewBillboardDialog from "@/components/admin/billboards/AddNewBillboardDialog";
import BillboardsTable from "@/components/admin/billboards/BillboardsTable";
import DashHeader from "@/components/admin/dashboard/DashHeader";

export default async function BillboardsPage() {
  const billboards = await getBillboards();

  return (
    <div>
      <DashHeader
        title="Billboards"
        subtitle="Manage your billboards"
        component={<AddNewBillboardDialog />}
      />
      <section className="mx-2">
        <BillboardsTable data={billboards} />
      </section>
    </div>
  );
}
