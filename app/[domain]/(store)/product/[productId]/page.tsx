import { getProduct, getProducts } from "@/data/product";

import { Separator } from "@/components/ui/separator";
import Container from "@/components/ui/Container";

import Gallery from "@/components/store/gallery/Gallery";
import ProductDescription from "@/components/store/product/ProductDescription";
import ProductInfo from "@/components/store/product/ProductInfo";
import ProductList from "@/components/store/ProductList";

interface ProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct((await params).productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  const suggestedProducts = await getProducts({
    categoryId: product.Category!.id,
  });

  // Remove the current product from the suggested products
  const filteredProducts = suggestedProducts.filter((p) => p.id !== product.id);

  return (
    <div className="">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product.imagesUrl} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <ProductInfo product={product} />
            </div>
          </div>
          <Separator className="my-4" />
          <ProductDescription description={product.description} />
          {filteredProducts.length > 0 && (
            <>
              <Separator className="my-4" />
              <ProductList title="Related Items" products={filteredProducts} />
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
