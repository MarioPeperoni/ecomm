"use client";

import { createCategory, updateCategory } from "@/actions/category";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CategorySchema } from "@/schema";

import { useStore } from "@/hooks/use-store";
import { toast } from "@/hooks/use-toast";

import { CategoryAEProps } from "@/components/admin/categories/CategoryAEDialogContent";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CategoryAEForm({
  category,
  closeDialog,
}: CategoryAEProps) {
  const [isSubmitting, startSubmitting] = useTransition();

  const store = useStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: category?.name ?? "",
      billboardId: category?.billboardId ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof CategorySchema>) => {
    startSubmitting(async () => {
      if (!category) {
        // Create new category
        await createCategory(values, store.id).then((res) => {
          if (res.success) {
            toast({
              title: "Category created",
              description: "The category has been created successfully",
            });
            router.refresh();
            closeDialog();
          } else {
            toast({
              title: "An error occurred while creating the category",
              description: res.error,
              variant: "destructive",
            });
          }
        });
      } else {
        // Update existing category
        await updateCategory(values, store.id, category.id).then((res) => {
          if (res.success) {
            toast({
              title: "Category updated",
              description: "The category has been updated successfully",
            });
            router.refresh();
            closeDialog();
          } else {
            toast({
              title: "An error occurred while updating the category",
              description: res.error,
              variant: "destructive",
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={isSubmitting} />
              </FormControl>
              <FormDescription>
                The name of the category. This will be displayed in the store
                navigation menu.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="billboardId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Billboard{" "}
                <span className="text-muted-foreground">(optional)</span>
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pick banner for category" />
                  </SelectTrigger>
                  <SelectContent>
                    {store.Billboards.length === 0 && (
                      <div className="flex justify-center">
                        <p className="select-none p-2 text-sm text-muted-foreground">
                          Your store does not have any billboards
                        </p>
                      </div>
                    )}
                    {store.Billboards.map((billboard) => (
                      <SelectItem key={billboard.id} value={billboard.id}>
                        {billboard.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                The billboard that will be displayed in the category page.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {category ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
}
