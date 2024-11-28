"use server";

import getDomain from "@/data/domain";

import prismadb from "@/lib/prismadb";

export default async function getBillboards() {
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
