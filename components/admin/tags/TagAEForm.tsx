"use client";

import { createTagGroup, updateTagGroup } from "@/actions/tag";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { cn } from "@/lib/utils";

import { useStore } from "@/hooks/use-store";
import { toast } from "@/hooks/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TagSchema } from "@/schema";

import { Badge } from "@/components/ui/badge";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { TagAEProps } from "@/components/admin/tags/TagAEDialogContent";

import TagEdit from "@/components/admin/tags/TagEdit";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { PencilLine, Plus, Trash2 } from "lucide-react";

export default function TagAEForm({ item: tagGroup, closeDialog }: TagAEProps) {
  const store = useStore();
  const router = useRouter();

  const [isSubmitting, startSubmitting] = useTransition();

  const [isAddingTag, setIsAddingTag] = useState(false);
  const [isEditingTag, setIsEditingTag] = useState(false);

  const [tagToEdit, setTagToEdit] = useState<string | null>(null);
  const [tagToDelete, setTagToDelete] = useState<string | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof TagSchema>>({
    resolver: zodResolver(TagSchema),
    defaultValues: {
      name: tagGroup?.name ?? "",
      tags: tagGroup?.Tags.map((tag) => tag.name) ?? [],
    },
  });

  const onSubmit = (values: z.infer<typeof TagSchema>) => {
    startSubmitting(async () => {
      if (tagGroup) {
        await updateTagGroup(values, tagGroup.Tags, tagGroup.id, store.id).then(
          (res) => {
            if (res.success) {
              toast({
                title: "Tag group updated",
                description: "The tag group has been updated.",
              });
              router.refresh();
              closeDialog();
            } else {
              toast({
                title: "An error occurred during tag group update",
                description: res.error,
              });
            }
          },
        );
      } else {
        createTagGroup(values, store.id).then((res) => {
          if (res.success) {
            toast({
              title: "Tag group created",
              description: "The tag group has been created.",
            });
            router.refresh();
            closeDialog();
          } else {
            toast({
              title: "An error occurred during tag group creation",
              description: res.error,
            });
          }
        });
      }
    });
  };

  const removeTag = (tagName: string) => {
    // Remove tag from the tagGroup object
    if (tagGroup) {
      tagGroup.Tags = tagGroup.Tags.filter((tag) => tag.name !== tagName);
    }

    // Remove the tag from the form
    form.setValue(
      "tags",
      form.getValues("tags").filter((tag) => tag !== tagName),
    );
    setTagToDelete(null);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input {...field} disabled={isSubmitting} />
              </FormControl>
              <FormDescription>
                This is the label of the tag group that will be displayed on the
                store page.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <div className="flex flex-wrap items-center gap-1 border p-2">
                  {field.value.map((tagName, index) => (
                    <div key={index}>
                      <div draggable>
                        <ContextMenu>
                          <ContextMenuTrigger>
                            {/* TAG EDITING */}
                            {isEditingTag && tagToEdit === tagName ? (
                              <TagEdit
                                tagGroup={tagGroup}
                                tagName={tagName}
                                setState={setIsEditingTag}
                                form={form}
                                disabled={isSubmitting}
                              />
                            ) : (
                              <Badge
                                variant={"secondary"}
                                className="p-2 px-4 hover:cursor-move"
                              >
                                {tagName}
                              </Badge>
                            )}
                          </ContextMenuTrigger>
                          <ContextMenuContent>
                            <ContextMenuItem
                              className="hover:cursor-pointer"
                              onClick={() => {
                                setTagToEdit(tagName);
                                setIsEditingTag(true);
                              }}
                              disabled={isSubmitting}
                            >
                              <PencilLine className="mr-2 size-4" />
                              Edit
                            </ContextMenuItem>
                            <ContextMenuItem
                              className="text-destructive hover:cursor-pointer focus:text-destructive"
                              onClick={() => {
                                setTagToDelete(tagName);
                                setDeleteDialogOpen(true);
                              }}
                              disabled={isSubmitting}
                            >
                              <Trash2 className="mr-2 size-4" />
                              Delete
                            </ContextMenuItem>
                          </ContextMenuContent>
                        </ContextMenu>
                      </div>

                      {/* ALERT DIALOG */}
                      <AlertDialog
                        open={deleteDialogOpen && tagToDelete === tagName}
                        onOpenChange={setDeleteDialogOpen}
                      >
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure you want to delete this tag?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This tag will be removed from all products.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive hover:bg-destructive/80"
                              onClick={() => removeTag(tagToDelete!)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ))}

                  {/* TAG ADDING */}
                  {isAddingTag ? (
                    <TagEdit
                      tagGroup={tagGroup}
                      tagName={null}
                      form={form}
                      setState={setIsAddingTag}
                      disabled={isSubmitting}
                    />
                  ) : (
                    <Badge
                      onClick={() => setIsAddingTag(true)}
                      className={cn(
                        "cursor-pointer p-2 px-4",
                        isSubmitting && "bg-muted-foreground",
                      )}
                    >
                      <Plus className="size-4" />
                    </Badge>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                These are the tags that customers can use to filter products.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {tagGroup ? "Save changes" : "Create tag group"}
        </Button>
      </form>
    </Form>
  );
}
