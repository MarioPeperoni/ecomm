"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useCart } from "@/hooks/use-cart";

import { Button } from "@/components/ui/button";

import LoadingDots from "@/components/loading/LoadingDots";

import { ShoppingBag } from "lucide-react";

export default function NavbarActions() {
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button onClick={() => router.push("/cart")}>
        <ShoppingBag />
        {isMounted ? (
          <span className="text-sm font-medium">{cart.items.length}</span>
        ) : (
          <LoadingDots dotsStyle="text-foreground bg-background size-1" />
        )}
      </Button>
    </div>
  );
}
