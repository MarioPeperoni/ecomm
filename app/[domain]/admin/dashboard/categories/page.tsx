import getCategories from "@/data/category";

import CategoriesTable from "@/components/admin/categories/table/CategoriesTable";
import DashHeader from "@/components/admin/dashboard/DashHeader";
import AddNewDialog from "@/components/admin/AddNewButton";
import CategoryAEDialogContent from "@/components/admin/categories/CategoryAEDialogContent";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <>
      <DashHeader
        title="Categories"
        subtitle="Manage your categories"
        component={<AddNewDialog DialogContent={CategoryAEDialogContent} />}
      />
      <section className="mx-2">
        <CategoriesTable data={categories} />
      </section>
    </>
  );
}
