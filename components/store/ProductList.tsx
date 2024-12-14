import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/store/ProductCard";

import { ProductExtended } from "@/types/storeExtended";

interface ProductListProps {
  title?: string;
  variant?: "max-5" | "max-4";
  products: ProductExtended[];
}

export default function ProductList({
  title,
  products,
  variant = "max-5",
}: ProductListProps) {
  const max5 =
    "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";
  const max4 =
    "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  const classes = variant === "max-5" ? max5 : max4;
  return (
    <div className="space-y-4">
      {title && <h3 className="text-2xl font-bold">{title}</h3>}
      {products.length === 0 && <NoResults />}
      <div className={classes}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
