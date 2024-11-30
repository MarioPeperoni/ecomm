"use server";

import getDomain from "@/data/domain";

import prismadb from "@/lib/prismadb";

export default async function getTags() {
  const domain = await getDomain();

  const tags = await prismadb.tagGroup.findMany({
    where: {
      Store: {
        domain: domain,
      },
    },
    include: {
      Tags: {
        orderBy: {
          index: "asc",
        },
      },
    },
  });

  return tags;
}
