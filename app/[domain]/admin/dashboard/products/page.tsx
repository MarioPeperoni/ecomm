import getStoreProducts from "@/data/product";

import AddNewDialog from "@/components/admin/AddNewButton";
import DashHeader from "@/components/admin/dashboard/DashHeader";
import ProductAddDialog from "@/components/admin/products/ProductAddDialog";
import ProductsTable from "@/components/admin/products/table/ProductsTable";

export default async function ProductsPage() {
  const products = await getStoreProducts();

  return (
    <>
      <DashHeader
        title={"Products"}
        subtitle={"Menage your products"}
        component={<AddNewDialog DialogContent={ProductAddDialog} />}
      />
      <section className="mx-2">
        <ProductsTable data={products} />
      </section>
    </>
  );
}
