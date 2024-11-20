"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <Button>
          <Link href={"/explore"}>Explore products</Link>
        </Button>
        <Button>
          <Link href={"/create"}>Create store</Link>
        </Button>
      </div>
    </div>
  );
}
