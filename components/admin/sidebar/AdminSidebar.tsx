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
  SidebarGroupLabel,
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
  LibraryBig,
  PackageOpen,
  PaintBucket,
  ShoppingBasket,
  Tag,
} from "lucide-react";

const pages = [
  {
    group: "Dashboard",
    items: [
      {
        title: "Home",
        href: "/admin/dashboard",
        Icon: Home,
      },
    ],
  },
  {
    group: "Stock",
    items: [
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
    ],
  },
  {
    group: "Menage",
    items: [
      {
        title: "Tags",
        href: "/admin/dashboard/tags",
        Icon: Tag,
      },
      {
        title: "Categories",
        href: "/admin/dashboard/categories",
        Icon: LibraryBig,
      },
    ],
  },
  {
    group: "Customization",
    items: [
      {
        title: "Billboards",
        href: "/admin/dashboard/billboards",
        Icon: GalleryThumbnails,
      },
      {
        title: "Style",
        href: "/admin/dashboard/style",
        Icon: PaintBucket,
      },
    ],
  },
  {
    group: "Settings",
    items: [
      {
        title: "Settings",
        href: "/admin/dashboard/settings",
        Icon: Cog,
      },
    ],
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
        {pages.map((group) => (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((page) => (
                  <SidebarMenuItem key={page.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={page.href}
                        className={cn(
                          pathName === page.href &&
                            "font-semibold text-primary",
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
        ))}
      </SidebarContent>
      <SidebarFooter>
        <UserBadge />
      </SidebarFooter>
    </Sidebar>
  );
}
