import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import CategoryAEForm from "@/components/admin/categories/CategoriesAEForm";

import { Category } from "@prisma/client";

export interface CategoryAEProps {
  category: Category | null;
  closeDialog: () => void;
}

export default function CategoryAEDialogContent({
  category,
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
      <CategoryAEForm category={category} closeDialog={closeDialog} />
    </DialogContent>
  );
}
