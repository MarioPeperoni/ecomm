"use client";

import Link from "next/link";

import { useStore } from "@/hooks/use-store";

import Container from "@/components/ui/Container";
import MainNav from "@/components/store/navbar/MainNav";
import NavbarActions from "@/components/store/navbar/NavbarActions";
import ImageWLoading from "@/components/ui/ImageWLoading";

export default function Navbar() {
  const store = useStore();

  return (
    <div className="border-b">
      <Container>
        <div className="relative flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href={"/"} className="ml-4 flex gap-x-2 lg:ml-0">
            {store.StoreStyle?.logoUrl ? (
              <div className="h-16 w-16 transition hover:scale-110">
                <ImageWLoading
                  src={store.StoreStyle.logoUrl}
                  alt={"Store Logo"}
                  width={64}
                  height={64}
                />
              </div>
            ) : (
              <p className="text-xl font-bold text-primary transition hover:scale-110">
                {store.name}
              </p>
            )}
          </Link>
          <MainNav categories={store.Categories} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
}
