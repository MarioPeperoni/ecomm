"use client";

import { useStore } from "@/hooks/store-context";

export default function DomainTestPage() {
  const store = useStore();

  return <div>Witaj w sklepie{store.name}!</div>;
}
