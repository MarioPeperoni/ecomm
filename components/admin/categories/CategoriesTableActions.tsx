"use client";

import { deleteCategory } from "@/actions/category";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { useStore } from "@/hooks/use-store";
import { toast } from "@/hooks/use-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import CategoryAEDialogContent from "@/components/admin/categories/CategoryAEDialogContent";

import { Category } from "@prisma/client";

import { PencilLine, Trash2 } from "lucide-react";

interface CategoryTableActionsProps {
  category: Category;
}

export default function CategoryTableActions({
  category,
}: CategoryTableActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, startProcessing] = useTransition();

  const store = useStore();
  const router = useRouter();

  const onDelete = () => {
    startProcessing(async () => {
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
    });
  };

  return (
    <div className="flex justify-end gap-2">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={"secondary"} className="size-10 hover:bg-primary/30">
            <PencilLine />
          </Button>
        </DialogTrigger>
        <CategoryAEDialogContent
          category={category}
          closeDialog={() => setIsOpen(false)}
        />
      </Dialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={"secondary"}
            className="group size-10 hover:bg-destructive/30"
          >
            <Trash2 className="text-destructive" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this category?
            </AlertDialogTitle>
            <AlertDialogDescription>
              The category will be removed and all assossiated items will be
              unlinked.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/80"
              onClick={onDelete}
              disabled={isProcessing}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
