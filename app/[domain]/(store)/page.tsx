import { getBillboard } from "@/data/bilboard";
import { getProducts } from "@/data/product";

import Billboard from "@/components/store/Billboard";
import ProductList from "@/components/store/ProductList";
import Container from "@/components/ui/Container";

export default async function HomePage() {
  const billboard = await getBillboard("178bb665-a95c-46b0-b6da-46e6383108c0");
  const products = await getProducts({ isFeatured: true });

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard
          billboard={billboard || undefined}
          text={!billboard ? `Welcome!` : undefined}
        />

        <section className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" products={products} />
        </section>
      </div>
    </Container>
  );
}
