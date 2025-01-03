"use client";

import Link from "next/link";

import { useStore } from "@/hooks/use-store";

import ImageWLoading from "@/components/ui/ImageWLoading";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Store } from "lucide-react";

export default function ShopBadge() {
  const store = useStore();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <Link href={`/`} className="flex items-center gap-2">
            {store.StoreStyle?.logoUrl ? (
              <div className="size-8">
                <ImageWLoading
                  src={store.StoreStyle.logoUrl}
                  alt="Store logo"
                  width={32}
                  height={32}
                />
              </div>
            ) : (
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Store className="size-4" />
              </div>
            )}
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold">{store.name}</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
