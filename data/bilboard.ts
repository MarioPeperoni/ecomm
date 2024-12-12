"use server";

import getDomain from "@/data/domain";

import prismadb from "@/lib/prismadb";

export async function getBillboards() {
  const domain = await getDomain();

  const billboards = await prismadb.billboard.findMany({
    where: {
      Store: {
        domain: domain,
      },
    },
  });

  return billboards;
}

export async function getBillboard(id: string) {
  const domain = await getDomain();

  const billboard = await prismadb.billboard.findFirst({
    where: {
      id,
      Store: {
        domain,
      },
    },
  });

  return billboard;
}
