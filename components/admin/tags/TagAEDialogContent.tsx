"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import TagAEForm from "@/components/admin/tags/TagAEForm";

import { TagExtended } from "@/types/storeExtended";

export interface TagAEProps {
  item: TagExtended | null;
  closeDialog: () => void;
}

export default function TagAEDialogContent({
  item: tag,
  closeDialog,
}: TagAEProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {!tag ? "Create new tag group" : "Edit tag group"}
        </DialogTitle>
        <DialogDescription>Configure tag group below.</DialogDescription>
      </DialogHeader>
      <TagAEForm item={tag} closeDialog={closeDialog} />
    </DialogContent>
  );
}
