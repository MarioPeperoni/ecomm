"use client";

import { deleteBillboard } from "@/actions/billboard";

import { useRouter } from "next/navigation";

import { useStore } from "@/hooks/use-store";
import { toast } from "@/hooks/use-toast";

import BillboardAEDialogContent from "@/components/admin/billboards/BillboardAEDialogContent";
import DataTableActions from "@/components/admin/DataTableActions";

import { Billboard } from "@prisma/client";

interface BillboardTableActionsProps {
  billboard: Billboard;
}

export default function BillboardsTableActions({
  billboard,
}: BillboardTableActionsProps) {
  const store = useStore();
  const router = useRouter();

  return (
    <DataTableActions
      item={billboard}
      deleteProps={{
        deleteTitle: "Are you sure you want to delete this billboard?",
        deleteDescription:
          "This billboard will be deleted from all categories assossiatedwith it.",
        onDelete: () => {
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
        },
      }}
      DialogContent={BillboardAEDialogContent}
    />
  );
}
