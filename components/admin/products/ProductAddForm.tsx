import { addProduct } from "@/actions/product";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import getCategories from "@/data/category";
import { toast } from "@/hooks/use-toast";

import { NewProductSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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

import LoadingSpinner from "@/components/loading/LoadingSpinner";

import { Category } from "@prisma/client";

export default function ProductAddForm() {
  const router = useRouter();

  const [isSubmitting, startSubmitting] = useTransition();
  const [isFetching, startFetching] = useTransition();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    startFetching(async () => {
      const categories = await getCategories();
      setCategories(categories);
    });
  }, []);

  const form = useForm<z.infer<typeof NewProductSchema>>({
    resolver: zodResolver(NewProductSchema),
    defaultValues: {
      name: "",
      category: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewProductSchema>) => {
    startSubmitting(async () => {
      addProduct(values).then((res) => {
        if (res.success) {
          toast({
            title: "Product created successfully",
            description: "You can now edit the product details",
          });
          router.push(`/admin/dashboard/products/${res.productId}`);
        } else {
          toast({
            title: "An error occurred while creating the product",
            description: res.error,
          });
        }
      });
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pick a product category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.length === 0 && !isFetching && (
                      <div className="flex flex-col items-center justify-center">
                        <p className="select-none p-2 text-sm text-muted-foreground">
                          Your store does not have any categories
                        </p>
                      </div>
                    )}
                    {isFetching && (
                      <div className="flex justify-center py-5">
                        <LoadingSpinner size={40} />
                      </div>
                    )}
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          Create product
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          In the next step you will be able to edit the product details.
        </p>
      </form>
    </Form>
  );
}
