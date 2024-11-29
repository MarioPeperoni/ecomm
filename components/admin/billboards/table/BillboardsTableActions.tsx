"use client";

import { deleteBillboard } from "@/actions/billboard";

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

import BillboardAEDialogContent from "@/components/admin/billboards/dialog/BillboardAEDialogContent";

import { Billboard } from "@prisma/client";

import { PencilLine, Trash2 } from "lucide-react";

interface BillboardTableActionsProps {
  billboard: Billboard;
}

export default function BillboardsTableActions({
  billboard,
}: BillboardTableActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, startProcessing] = useTransition();

  const store = useStore();
  const router = useRouter();
  const onDelete = () => {
    startProcessing(async () => {
      deleteBillboard(store.id, billboard.id).then((res) => {
        if (res.success) {
          toast({
            title: "Billboard deleted",
            description: "The billboard has been successfully deleted.",
          });
          router.refresh();
        } else {
          toast({
            title: "An error occurred during billboard deletion",
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
        <BillboardAEDialogContent
          billboard={billboard}
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
              Are you sure you want to delete this billboard?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This billboard will be deleted from all categories assossiated
              with it.
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
