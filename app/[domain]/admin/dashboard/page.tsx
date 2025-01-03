import getRecentRevenue, {
  getRecentOrders,
  getTotalStock,
} from "@/data/overview";

import DashHeader from "@/components/admin/dashboard/DashHeader";
import StatCard from "@/components/admin/overview/StatCard";

import { BoxesIcon, DollarSign, Handshake } from "lucide-react";

export default async function AdminDashboardPage() {
  const recentRevenue = await getRecentRevenue();
  const recentOrders = await getRecentOrders();
  const totalStock = await getTotalStock();

  return (
    <>
      <DashHeader title="Dashboard" subtitle="Overview of your store" />
      <section className="mx-2 grid grid-cols-3 gap-4">
        <StatCard
          title="Revenue (30 days)"
          icon={DollarSign}
          value={`$${recentRevenue}`}
        />
        <StatCard
          title="Orders (30 days)"
          icon={Handshake}
          value={`+${recentOrders}`}
        />
        <StatCard
          title="Products in Stock"
          icon={BoxesIcon}
          value={`${totalStock}`}
        />
      </section>
    </>
  );
}
