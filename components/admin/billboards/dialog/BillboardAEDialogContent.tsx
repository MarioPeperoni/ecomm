import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import BillboardAEForm from "@/components/admin/billboards//BillboardAEForm";

import { Billboard } from "@prisma/client";

interface BillboardAEProps {
  billboard: Billboard | null;
  closeDialog: () => void;
}

export default function BillboardAEDialogContent({
  billboard,
  closeDialog,
}: BillboardAEProps) {
  return (
    <DialogContent>
      <DialogTitle>
        {!billboard ? "Create new billboard" : "Edit billboard"}
      </DialogTitle>
      <DialogDescription>
        Configure the billboard settings below.
      </DialogDescription>
      <BillboardAEForm billboard={billboard} closeDialog={closeDialog} />
    </DialogContent>
  );
}
