import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import DashHeader from "@/components/admin/dashboard/DashHeader";
import ProductAEForm from "@/components/admin/products/ProductEditForm";

import { getProduct } from "@/data/product";

export default async function ProductAEPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = await getProduct((await params).productId);

  if (product === null) {
    return <p>Product not found</p>;
  }

  const breadcrumb = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin/dashboard/products/">
            Products
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{product.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  return (
    <>
      <DashHeader
        title={`${product.name}`}
        subtitle={"Edit product properties and variants"}
        breadcrumb={breadcrumb}
      />
      <section className="m-2 mx-auto max-w-[800px] justify-center">
        <ProductAEForm product={product} />
      </section>
    </>
  );
}
