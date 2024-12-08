import prismadb from "@/lib/prismadb";

import { StoreProvider } from "@/hooks/use-store";

export default async function DomainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ domain: string }>;
}) {
  const awaitedParams = await params;

  const domain = awaitedParams.domain.split(".")[0];

  const store = await prismadb.store.findFirst({
    where: {
      domain: domain,
    },
    include: {
      Categories: true,
    },
  });

  if (!store) {
    return <div>Store not found</div>;
  }

  return <StoreProvider store={store}>{children}</StoreProvider>;
}
