"use server";

import getDomain from "@/data/domain";

import prismadb from "@/lib/prismadb";
import { ProductExtended } from "@/types/storeExtended";

export default async function getStoreProducts() {
  const domain = await getDomain();

  const products = await prismadb.product.findMany({
    where: {
      Store: {
        domain: domain,
      },
    },
    include: {
      Category: true,
      ProductTag: {
        include: {
          Tag: true,
        },
      },
    },
  });

  return products.map((product) => ({
    ...product,
    Category: product.Category ? { ...product.Category } : null,
    Tags: product.ProductTag.map((tag) => tag.Tag),
  })) as ProductExtended[];
}

interface ProductsQuery {
  categoryId?: string;
  isFeatured?: boolean;
  tags?: { [k: string]: string[] };
}

export async function getProducts(query: ProductsQuery) {
  const domain = await getDomain();

  // Build filtering logic based on selected tags
  const tagFilters = query.tags
    ? Object.entries(query.tags).map(([groupId, tagIds]) => ({
        ProductTag: {
          some: {
            Tag: {
              id: { in: tagIds },
              TagGroup: { id: groupId }, // Ensure tags are matched within their groups
            },
          },
        },
      }))
    : [];

  const products = await prismadb.product.findMany({
    where: {
      Store: {
        domain: domain,
      },
      Category: query.categoryId
        ? { id: query.categoryId }
        : { NOT: undefined },
      isFeatured: query.isFeatured,
      price: { not: undefined },
      AND: tagFilters.length > 0 ? tagFilters : undefined,
    },
    include: {
      Category: true,
      ProductTag: {
        include: {
          Tag: true,
        },
      },
    },
  });

  return products.map((product) => ({
    ...product,
    Category: product.Category,
    Tags: product.ProductTag.map((tag) => tag.Tag),
  })) as ProductExtended[];
}

export async function getProduct(productId: string) {
  const product = await prismadb.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      Category: true,
      ProductTag: {
        include: {
          Tag: true,
        },
      },
    },
  });

  if (!product) {
    return null;
  }

  return {
    ...product,
    Category: product.Category ? { ...product.Category } : null,
    Tags: product.ProductTag.map((tag) => tag.Tag),
  } as ProductExtended;
}
