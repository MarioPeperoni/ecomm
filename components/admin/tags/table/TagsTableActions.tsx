"use client";

import { deleteTagGroup } from "@/actions/tag";

import { useRouter } from "next/navigation";

import { toast } from "@/hooks/use-toast";

import DataTableActions from "@/components/admin/DataTableActions";
import TagAEDialogContent from "@/components/admin/tags/TagAEDialogContent";

import { TagGroup } from "@prisma/client";

interface TagsTableActionsProps {
  tagGroup: TagGroup;
}

export default function TagsTableActions({ tagGroup }: TagsTableActionsProps) {
  const router = useRouter();

  return (
    <DataTableActions
      item={tagGroup}
      deleteProps={{
        deleteTitle: "Are you sure you want to delete this tag group?",
        deleteDescription:
          "This tag group will be deleted and all assossiated items will be unlinked.",
        onDelete: () => {
          deleteTagGroup(tagGroup.id).then((res) => {
            if (res.success) {
              toast({
                title: "Tag group deleted",
                description: "The tag group has been successfully deleted.",
              });
              router.refresh();
            } else {
              toast({
                title: "An error occurred during tag group deletion",
                description: res.error,
              });
            }
          });
        },
      }}
      DialogContent={TagAEDialogContent}
    />
  );
}
