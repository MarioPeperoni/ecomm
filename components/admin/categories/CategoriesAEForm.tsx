"use client";

import { createCategory, updateCategory } from "@/actions/category";

import getBillboards from "@/data/bilboard";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CategorySchema } from "@/schema";

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
import LoadingSpinner from "@/components/loading/LoadingSpinner";

import { Billboard } from "@prisma/client";

export default function CategoryAEForm({
  item: category,
  closeDialog,
}: CategoryAEProps) {
  const [isSubmitting, startSubmitting] = useTransition();
  const [isFetching, startFetching] = useTransition();

  const [billboards, setBillboards] = useState<Billboard[]>([]);

  const router = useRouter();

  useEffect(() => {
    // Fetch billboards to populate the select dropdown
    const fetchBillboards = async () => {
      const billboards = await getBillboards();
      setBillboards(billboards);
    };

    startFetching(() => {
      fetchBillboards();
    });
  }, []);

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
        await createCategory(values).then((res) => {
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
        await updateCategory(values, category.id).then((res) => {
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
                    {billboards.length === 0 && !isFetching && (
                      <div className="flex justify-center">
                        <p className="select-none p-2 text-sm text-muted-foreground">
                          Your store does not have any billboards
                        </p>
                      </div>
                    )}
                    {isFetching && (
                      <div className="flex justify-center py-5">
                        <LoadingSpinner size={40} />
                      </div>
                    )}
                    {billboards.map((billboard) => (
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
