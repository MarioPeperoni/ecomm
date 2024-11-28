"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import ShopBadge from "@/components/admin/sidebar/ShopBadge";
import UserBadge from "@/components/admin/sidebar/UserBadge";

import {
  Cog,
  GalleryThumbnails,
  Home,
  PackageOpen,
  ShoppingBasket,
} from "lucide-react";

const pages = [
  {
    title: "Home",
    href: "/admin/dashboard",
    Icon: Home,
  },
  {
    title: "Products",
    href: "/admin/dashboard/products",
    Icon: ShoppingBasket,
  },
  {
    title: "Orders",
    href: "/admin/dashboard/orders",
    Icon: PackageOpen,
  },
  {
    title: "Billboards",
    href: "/admin/dashboard/billboards",
    Icon: GalleryThumbnails,
  },
  {
    title: "Settings",
    href: "/admin/dashboard/settings",
    Icon: Cog,
  },
];

export default function AdminSidebar() {
  const pathName = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <ShopBadge />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {pages.map((page) => (
                <SidebarMenuItem key={page.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={page.href}
                      className={cn(
                        pathName === page.href && "font-semibold text-primary",
                      )}
                    >
                      <page.Icon />
                      <span>{page.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserBadge />
      </SidebarFooter>
    </Sidebar>
  );
}
