"use client";

import { useStore } from "@/hooks/use-store";

import { CategoryColumns } from "@/components/admin/categories/CategoryTableColumns";
import { DataTable } from "@/components/admin/DataTable";

export default function CategoriesTable() {
  const store = useStore();

  const data = store.Categories;
  const columns = CategoryColumns;

  return <DataTable data={data} columns={columns} />;
}
