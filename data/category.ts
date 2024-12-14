"use server";

import getDomain from "@/data/domain";

import prismadb from "@/lib/prismadb";

export default async function getCategories() {
  const domain = await getDomain();

  const categories = await prismadb.category.findMany({
    where: {
      Store: {
        domain: domain,
      },
    },
    include: {
      Billboard: true,
    },
  });

  return categories;
}

export async function getCategory(categoryId: string) {
  const domain = await getDomain();

  const category = await prismadb.category.findFirst({
    where: {
      id: categoryId,
      Store: {
        domain: domain,
      },
    },
    include: {
      Billboard: true,
    },
  });

  return category;
}
