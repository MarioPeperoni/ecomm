"use server";

import { headers } from "next/headers";

export default async function getDomain() {
  const domainHeaders = await headers();
  const host = domainHeaders.get("host");
  const domain = host!.split(".")[0];

  return domain;
}
