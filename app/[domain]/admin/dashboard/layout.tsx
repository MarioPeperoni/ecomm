import { SidebarProvider } from "@/components/ui/sidebar";
import { UserProvider } from "@/hooks/use-user";

import AdminSidebar from "@/components/admin/sidebar/AdminSidebar";

export default async function DomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <SidebarProvider>
        <AdminSidebar />
        <main className="w-full bg-background">{children}</main>
      </SidebarProvider>
    </UserProvider>
  );
}
