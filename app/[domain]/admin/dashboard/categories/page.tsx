import getCategories from "@/data/category";

import AddNewCategoryDialog from "@/components/admin/categories/AddNewCategoryDialog";
import CategoriesTable from "@/components/admin/categories/CategoriesTable";
import DashHeader from "@/components/admin/dashboard/DashHeader";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <>
      <DashHeader
        title="Categories"
        subtitle="Manage your categories"
        component={<AddNewCategoryDialog />}
      />
      <section className="mx-2">
        <CategoriesTable data={categories} />
      </section>
    </>
  );
}
