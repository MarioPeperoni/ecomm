import getTags from "@/data/tag";
import { getProducts } from "@/data/product";
import { getCategory } from "@/data/category";

import Billboard from "@/components/store/Billboard";
import Filter from "@/components/store/filters/Filter";
import ProductList from "@/components/store/ProductList";

import Container from "@/components/ui/Container";
import { Separator } from "@/components/ui/separator";

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: Record<string, string>;
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const tagFilters = Object.fromEntries(
    Object.entries(searchParams).map(([key, value]) => [key, value.split(",")]),
  );

  const products = await getProducts({
    categoryId: params.categoryId,
    tags: tagFilters,
  });

  const tagGroups = await getTags();
  const category = await getCategory(params.categoryId);

  if (!category) {
    return null;
  }

  return (
    <div>
      <Container>
        <Billboard
          billboard={category.Billboard || undefined}
          text={category.name}
        />
        <div className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <div>
              {tagGroups.map((tagGroup) => (
                <Filter key={tagGroup.id} tagGroup={tagGroup} />
              ))}
              <Separator className="my-4 block lg:hidden" />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              <ProductList products={products} variant="max-4" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
