import AddNewBillboardDialog from "@/components/admin/billboards/AddNewBillboardDialog";
import BillboardsTable from "@/components/admin/billboards/BillboardsTable";
import DashHeader from "@/components/admin/dashboard/DashHeader";

export default function BillboardsPage() {
  return (
    <div>
      <DashHeader
        title="Billboards"
        subtitle="Manage your billboards"
        component={<AddNewBillboardDialog />}
      />
      <section className="mx-2">
        <BillboardsTable />
      </section>
    </div>
  );
}
