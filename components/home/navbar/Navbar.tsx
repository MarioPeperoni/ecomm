import Link from "next/link";

import SearchBox from "@/components/home/searchBox";

import { Button } from "@/components/ui/button";

export default function HomeNavbar() {
  return (
    <div className="mx-2 border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-2">
        <div className="flex items-center">
          <h1 className="mr-8 text-2xl font-bold text-primary">U-commerce</h1>
        </div>
        <div className="flex items-center gap-4">
          <SearchBox />
          <Link href={"/create"}>
            <Button>Create store</Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
