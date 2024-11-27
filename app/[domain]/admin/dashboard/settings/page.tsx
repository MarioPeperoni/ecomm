import DashHeader from "@/components/admin/dashboard/DashHeader";
import SettingsForm from "@/components/admin/settings/SettingsForm";

export default function SettingsPage() {
  return (
    <div>
      <DashHeader title="Settings" subtitle="Menage your strore settings" />
      <div className="mx-2">
        <SettingsForm />
      </div>
    </div>
  );
}
