"use client";

import { logout } from "@/actions/auth";

import { useEffect, useState } from "react";

import { useUser } from "@/hooks/use-user";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { ChevronUp, LogOut, User2 } from "lucide-react";

export default function UserBadge() {
  const [isLoading, setIsLoading] = useState(true);

  const user = useUser();

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  const logOutHandler = async () => {
    await logout().then(() => {
      window.location.reload();
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size={"lg"}>
              <User2 className="size-2" />
              <div className="flex flex-col">
                <span className="font-semibold">Logged as admin</span>
                <span className="truncate text-xs">
                  {isLoading ? "Loading.. " : user?.email}
                </span>
              </div>
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            <DropdownMenuItem onClick={logOutHandler}>
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
