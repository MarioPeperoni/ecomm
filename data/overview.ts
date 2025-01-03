"use server";

import prismadb from "@/lib/prismadb";
import getDomain from "@/data/domain";

export default async function getRecentRevenue() {
  const domain = await getDomain();

  const revenue = await prismadb.orderItem.aggregate({
    _sum: {
      price: true,
    },
    where: {
      Order: {
        isPaid: true,
        Store: {
          domain: domain,
        },
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30)), // Last 30 days
        },
      },
    },
  });

  return revenue._sum.price || 0;
}

export async function getTotalStock() {
  const domain = await getDomain();

  const products = await prismadb.product.findMany({
    where: { Store: { domain: domain } },
    select: { quantity: true },
  });

  const totalStock = products.reduce((sum, product) => {
    const productStock = product.quantity.reduce(
      (qtySum, qty) => qtySum + qty,
      0,
    );
    return sum + productStock;
  }, 0);

  return totalStock;
}

export async function getRecentOrders() {
  const domain = await getDomain();

  const recentOrders = await prismadb.order.count({
    where: {
      Store: {
        domain: domain,
      },
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)), // Last 30 days
      },
    },
  });

  return recentOrders;
}
