"use client";

import { useEffect, useState } from "react";

import { hexToHsl } from "@/utils/hsl";
import { useStore } from "@/hooks/use-store";

import PageStyleLoading from "@/components/loading/PageStyleLoading";

export default function StyleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const store = useStore();

  useEffect(() => {
    // Change root style to store style
    if (store.StoreStyle) {
      const primaryColor = hexToHsl(store.StoreStyle.primaryColor);

      document.documentElement.style.setProperty("--primary", primaryColor);
      document.documentElement.style.setProperty("--ring", primaryColor);
      document.documentElement.style.setProperty(
        "--sidebar-primary",
        primaryColor,
      );
      document.documentElement.style.setProperty(
        "--radius",
        store.StoreStyle.radius,
      );
    }
    setIsLoaded(true);
  }, [store.StoreStyle]);

  return isLoaded ? children : <PageStyleLoading storeName={store.name} />;
}
