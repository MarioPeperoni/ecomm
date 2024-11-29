"use client";

import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import CategoryAEForm from "@/components/admin/categories/CategoriesAEForm";

import { Category } from "@prisma/client";

export interface CategoryAEProps {
  item: Category | null;
  closeDialog: () => void;
}

export default function CategoryAEDialogContent({
  item: category,
  closeDialog,
}: CategoryAEProps) {
  return (
    <DialogContent>
      <DialogTitle>
        {!category ? "Create new category" : "Edit category"}
      </DialogTitle>
      <DialogDescription>
        Configure the category settings below.
      </DialogDescription>
      <CategoryAEForm item={category} closeDialog={closeDialog} />
    </DialogContent>
  );
}
