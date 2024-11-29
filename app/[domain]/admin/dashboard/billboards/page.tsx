import getBillboards from "@/data/bilboard";

import BillboardsTable from "@/components/admin/billboards/table/BillboardsTable";
import DashHeader from "@/components/admin/dashboard/DashHeader";
import AddNewDialog from "@/components/admin/AddNewButton";
import BillboardAEDialogContent from "@/components/admin/billboards/BillboardAEDialogContent";

export default async function BillboardsPage() {
  const billboards = await getBillboards();

  return (
    <div>
      <DashHeader
        title="Billboards"
        subtitle="Manage your billboards"
        component={<AddNewDialog DialogContent={BillboardAEDialogContent} />}
      />
      <section className="mx-2">
        <BillboardsTable data={billboards} />
      </section>
    </div>
  );
}
