import prismadb from "@/lib/prismadb";

import { StoreProvider } from "@/hooks/use-store";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserProvider } from "@/hooks/use-user";

import AdminSidebar from "@/components/admin/sidebar/AdminSidebar";

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

  return (
    <StoreProvider store={store}>
      <UserProvider>
        <SidebarProvider>
          <AdminSidebar />
          <main className="w-full bg-background">{children}</main>
        </SidebarProvider>
      </UserProvider>
    </StoreProvider>
  );
}
