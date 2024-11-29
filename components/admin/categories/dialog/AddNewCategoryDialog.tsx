"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import CategoryAEDialogContent from "@/components/admin/categories/dialog/CategoryAEDialogContent";

import { Plus } from "lucide-react";

export default function AddNewCategoryDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="font-bold">
          <Plus />
          Add New
        </Button>
      </DialogTrigger>
      <CategoryAEDialogContent
        category={null}
        closeDialog={() => setIsOpen(true)}
      />
    </Dialog>
  );
}
