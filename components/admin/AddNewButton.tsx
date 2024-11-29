"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { Plus } from "lucide-react";

type DialogContentProps = {
  item: any;
  closeDialog: () => void;
};

interface AddNewDialogProps {
  DialogContent: React.ComponentType<DialogContentProps>;
}

export default function AddNewDialog({ DialogContent }: AddNewDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="font-bold">
          <Plus />
          Add New
        </Button>
      </DialogTrigger>
      <DialogContent item={null} closeDialog={() => setIsOpen(false)} />
    </Dialog>
  );
}
