"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import BillboardAEDialogContent from "@/components/admin/billboards/dialog/BillboardAEDialogContent";

import { Plus } from "lucide-react";

export default function AddNewBillboardDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="font-bold">
          <Plus />
          Add New
        </Button>
      </DialogTrigger>
      <BillboardAEDialogContent
        billboard={null}
        closeDialog={() => setIsOpen(true)}
      />
    </Dialog>
  );
}
