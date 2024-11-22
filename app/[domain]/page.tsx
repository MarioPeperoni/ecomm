"use client";

import { useStore } from "@/hooks/use-store";

export default function DomainTestPage() {
  const store = useStore();

  return <div>Witaj w sklepie{store.name}!</div>;
}
