"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import LoadingDots from "@/components/loading/LoadingDots";

import { ShoppingBag } from "lucide-react";

export default function NavbarActions() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button>
        <ShoppingBag />
        {isMounted ? (
          <span className="text-sm font-medium">0</span>
        ) : (
          <LoadingDots dotsStyle="text-foreground bg-background size-1" />
        )}
      </Button>
    </div>
  );
}
