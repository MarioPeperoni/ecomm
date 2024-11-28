"use client";

import { createBillboard, updateBillboard } from "@/actions/billboard";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { useStore } from "@/hooks/use-store";
import { toast } from "@/hooks/use-toast";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BillboardSchema } from "@/schema";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import BillboardImageUpload from "@/components/admin/billboards/BillboardImageUpload";

import { Billboard } from "@prisma/client";
import { fontNameLabels } from "@/types/fontName";

interface BillboardAEProps {
  billboard: Billboard | null;
  closeDialog: () => void;
}

export default function BillboardAEForm({
  billboard,
  closeDialog,
}: BillboardAEProps) {
  const [isSubmitting, startSubmitting] = useTransition();

  const store = useStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof BillboardSchema>>({
    resolver: zodResolver(BillboardSchema),
    defaultValues: {
      label: billboard?.label ?? "",
      text: billboard?.text ?? "",
      fontName: billboard?.fontName ?? "ARIAL",
      imageUrl: billboard?.imageUrl ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof BillboardSchema>) => {
    startSubmitting(() => {
      if (!billboard) {
        // Create
        createBillboard(values, store.id).then((res) => {
          if (res.success) {
            toast({
              title: "Billboard created",
              description: "The billboard has been successfully created.",
            });
            closeDialog();
            router.refresh();
          } else {
            toast({
              title: "An error occurred during billboard creation",
              description: res.error,
            });
          }
        });
      } else {
        // Update
        updateBillboard(values, store.id, billboard.id).then((res) => {
          if (res.success) {
            toast({
              title: "Billboard updated",
              description: "The billboard has been successfully updated.",
            });
            closeDialog();
            router.refresh();
          } else {
            toast({
              title: "An error occurred during billboard update",
              description: res.error,
            });
          }
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Billboard label</FormLabel>
              <FormControl>
                <Input {...field} disabled={isSubmitting} />
              </FormControl>
              <FormDescription>
                The label of the billboard. This is used for identification.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Billboard text{" "}
                <span className="text-muted-foreground">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input {...field} disabled={isSubmitting} />
              </FormControl>
              <FormDescription>
                The text that will be displayed on the billboard. If image has
                text on it, you can leave this empty.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fontName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font Family</FormLabel>
              <FormControl>
                <div>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pick font family"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(fontNameLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Background image{" "}
                <span className="text-muted-foreground">(optional)</span>
              </FormLabel>
              <FormControl>
                <BillboardImageUpload field={field} />
              </FormControl>
              <FormDescription>
                If you don't upload an image, the billboard will use primary
                color as background.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {billboard ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
}
