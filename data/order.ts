"use server";

import getDomain from "@/data/domain";

import prismadb from "@/lib/prismadb";

export default async function getOrders() {
  const domain = await getDomain();

  const orders = await prismadb.order.findMany({
    where: {
      Store: {
        domain: domain,
      },
    },
    include: {
      OrderItems: {
        include: {
          Product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
}
