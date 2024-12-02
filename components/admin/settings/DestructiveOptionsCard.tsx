"use client";

import { deleteStore } from "@/actions/store";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

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
import { Card, CardContent } from "@/components/ui/card";

import { Trash2 } from "lucide-react";

export default function DestructiveOptionsCard() {
  const store = useStore();
  const router = useRouter();

  const [isSubmitting, startSubmitting] = useTransition();

  const onStoreDelete = () => {
    startSubmitting(async () => {
      await deleteStore(store.id).then((res) => {
        if (res.success) {
          toast({
            title: "Store deleted",
            description:
              "The store has been deleted successfully, you will be redirected to the shortly...",
          });

          setTimeout(() => {
            router.replace("/");
          }, 3000);
        } else {
          toast({
            title: "An error occurred during store deletion",
            description: res.error,
            variant: "destructive",
          });
        }
      });
    });
  };

  return (
    <Card>
      <CardContent className="flex justify-between gap-2 p-3">
        <div>
          <p className="font-bold">Delete this store</p>
          <p className="text-sm text-muted-foreground">
            Once you delete this shop, there is no going back. Please be
            certain.
          </p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"} disabled={isSubmitting}>
              <Trash2 />
              Delete store
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this store?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={onStoreDelete}
                className="bg-destructive hover:bg-destructive/80"
              >
                  Yes, delete store
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
