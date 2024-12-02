"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
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
      <DialogHeader>
        <DialogTitle>
          {!category ? "Create new category" : "Edit category"}
        </DialogTitle>
        <DialogDescription>
          Configure the category settings below.
        </DialogDescription>
      </DialogHeader>
      <CategoryAEForm item={category} closeDialog={closeDialog} />
    </DialogContent>
  );
}
