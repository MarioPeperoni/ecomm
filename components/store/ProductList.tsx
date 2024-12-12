import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/store/ProductCard";

import { ProductExtended } from "@/types/storeExtended";

interface ProductListProps {
  title: string;
  products: ProductExtended[];
}

export default function ProductList({ title, products }: ProductListProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-3xl font-bold">{title}</h3>
      {products.length === 0 && <NoResults />}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
