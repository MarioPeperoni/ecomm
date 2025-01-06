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
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)), // Last 30 days
      },
    },
  });

  return recentOrders;
}

export interface ChartData {
  date: string;
  [category: string]: number | string;
}

export async function getSalesData(): Promise<ChartData[]> {
  const domain = await getDomain();

  // Define the start date for the last 3 months
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 3);

  // Fetch all orders and their related data
  const orders = await prismadb.order.findMany({
    where: {
      Store: {
        domain: domain,
      },
      isPaid: true,
      createdAt: {
        gte: startDate,
      },
    },
    include: {
      OrderItems: {
        include: {
          Product: {
            include: {
              Category: true,
            },
          },
        },
      },
    },
  });

  // Process the data to group by date and category
  const revenueData: Record<string, Record<string, number>> = {};

  orders.forEach((order) => {
    const date = order.createdAt.toISOString().split("T")[0];
    order.OrderItems.forEach((item) => {
      const category = item.Product.Category?.name || "Uncategorized";
      const revenue = item.price * item.quantity;

      if (!revenueData[date]) {
        revenueData[date] = {};
      }
      if (!revenueData[date][category]) {
        revenueData[date][category] = 0;
      }

      revenueData[date][category] += revenue;
    });
  });

  // Convert the grouped data into chart format
  const chartData: ChartData[] = Object.entries(revenueData).map(
    ([date, categories]) => {
      return {
        date,
        ...categories,
      };
    },
  );

  console.log(chartData);

  return chartData;
}
