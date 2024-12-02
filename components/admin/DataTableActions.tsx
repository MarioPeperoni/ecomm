"use client";

import { useState, useTransition } from "react";

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

import { PencilLine, Trash2 } from "lucide-react";

interface DeleteProps {
  deleteTitle: string;
  deleteDescription: string;
  onDelete: () => void;
}

type DialogContentProps = {
  item: any;
  closeDialog: () => void;
};

interface DatatableActionsProps {
  children?: React.ReactNode;
  item: any;
  deleteProps: DeleteProps;
  DialogContent: React.ComponentType<DialogContentProps>;
}

export default function DataTableActions({
  item,
  deleteProps,
  DialogContent,
}: DatatableActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, startProcessing] = useTransition();

  const handleDelete = () => {
    startProcessing(async () => {
      deleteProps.onDelete();
    });
  };
  return (
    <div className="flex justify-end gap-2">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={"secondary"} className="size-10 hover:bg-primary/20">
            <PencilLine />
          </Button>
        </DialogTrigger>
        <DialogContent item={item} closeDialog={() => setIsOpen(false)} />
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
            <AlertDialogTitle>{deleteProps.deleteTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteProps.deleteDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/80"
              onClick={handleDelete}
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
