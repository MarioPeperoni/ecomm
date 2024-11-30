"use client";

import { deleteCategory } from "@/actions/category";

import { useRouter } from "next/navigation";

import { useStore } from "@/hooks/use-store";
import { toast } from "@/hooks/use-toast";

import CategoryAEDialogContent from "@/components/admin/categories/CategoryAEDialogContent";
import DataTableActions from "@/components/admin/DataTableActions";

import { Category } from "@prisma/client";

interface CategoryTableActionsProps {
  category: Category;
}

export default function CategoryTableActions({
  category,
}: CategoryTableActionsProps) {
  const store = useStore();
  const router = useRouter();

  return (
    <DataTableActions
      item={category}
      deleteProps={{
        deleteTitle: "Are you sure you want to delete this category?",
        deleteDescription:
          "The category will be removed and all assossiated items will be unlinked.",
        onDelete: () => {
          deleteCategory(store.id, category.id).then((res) => {
            if (res.success) {
              toast({
                title: "Category deleted",
                description: "The category has been successfully deleted.",
              });
              router.refresh();
            } else {
              toast({
                title: "An error occurred during category deletion",
                description: res.error,
              });
            }
          });
        },
      }}
      DialogContent={CategoryAEDialogContent}
    />
  );
}
