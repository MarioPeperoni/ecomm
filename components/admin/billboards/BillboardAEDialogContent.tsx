"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import BillboardAEForm from "@/components/admin/billboards//BillboardAEForm";

import { Billboard } from "@prisma/client";

interface BillboardAEProps {
  item: Billboard | null;
  closeDialog: () => void;
}

export default function BillboardAEDialogContent({
  item: billboard,
  closeDialog,
}: BillboardAEProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {!billboard ? "Create new billboard" : "Edit billboard"}
        </DialogTitle>
        <DialogDescription>
          Configure the billboard settings below.
        </DialogDescription>
      </DialogHeader>
      <BillboardAEForm billboard={billboard} closeDialog={closeDialog} />
    </DialogContent>
  );
}
