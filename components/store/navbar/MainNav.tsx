import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Category } from "@prisma/client";

interface MainNavProps {
  categories: Category[];
}

export default function MainNav({ categories }: MainNavProps) {
  const pathName = usePathname();
  const routes = categories.map((category) => ({
    href: `/category/${category.name}`,
    label: category.name,
    active: pathName.includes(`/category/${category.id}`),
  }));

  return (
    <nav className="mx-6 mt-1 flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium text-secondary-foreground transition-colors hover:text-primary/90",
            route.active && "text-primary",
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
