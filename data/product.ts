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
    Category: {
      ...product.Category,
    },
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
    Category: {
      ...product.Category,
    },
    Tags: product.ProductTag.map((tag) => tag.Tag),
  } as ProductExtended;
}
