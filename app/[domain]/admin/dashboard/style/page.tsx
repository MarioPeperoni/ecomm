import DashHeader from "@/components/admin/dashboard/DashHeader";
import StyleForm from "@/components/admin/style/StyleForm";

export default async function StylePage() {
  return (
    <>
      <DashHeader title="Style" subtitle="Menage styling of your store" />
      <section className="mx-2">
        <StyleForm />
      </section>
    </>
  );
}
