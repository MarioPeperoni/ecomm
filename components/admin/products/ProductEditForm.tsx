"use client";

import { deleteProduct, editProduct } from "@/actions/product";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProductSchema } from "@/schema";

import getCategories from "@/data/category";

import { toast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import LoadingDots from "@/components/loading/LoadingDots";
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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import ProductGallery from "@/components/admin/products/ProductGallery";
import SizesToggleInput from "@/components/admin/products/ProductSizesToggleInput";
import ProductTagSelect from "@/components/admin/products/ProductTagSelect";

import { ProductExtended } from "@/types/storeExtended";

import { Category, Tag } from "@prisma/client";

export default function ProductAEForm({
  product,
}: {
  product: ProductExtended;
}) {
  const router = useRouter();

  const [isSubmitting, startSubmitting] = useTransition();
  const [isSizesMode, setIsSizesMode] = useState(product.quantity.length > 1);

  const [isFetching, startFetching] = useTransition();
  const [categories, setCategories] = useState<Category[]>([]);

  const [tags, setTags] = useState<Tag[]>(product.Tags);

  const sizes = ["XS", "S", "M", "L", "XL"];

  useEffect(() => {
    startFetching(async () => {
      const categories = await getCategories();
      setCategories(categories);
    });
  }, []);

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: product.name || "",
      description: product.description || "",
      categoryId: (product.Category && product.Category.id) || "",
      quantity: product.quantity || [1],
      price: product.price,
      isFeatured: product.isFeatured || false,
      imagesUrl: product.imagesUrl || [],
    },
  });

  const toggleSizeMode = (isSize: boolean) => {
    if (isSize) {
      // Set quantity to array of sizes
      form.setValue("quantity", [0, 0, 0, 0, 0]);
    } else {
      form.setValue("quantity", [0]);
    }
    setIsSizesMode(isSize);
  };

  const onSubmit = (values: z.infer<typeof ProductSchema>) => {
    startSubmitting(async () => {
      await editProduct(values, tags, product.id).then((res) => {
        if (res.success) {
          toast({
            title: "Product updated",
            description: "The product has been updated.",
          });
          router.back();
        } else {
          toast({
            title: "An error occurred during product update",
            description: res.error,
          });
        }
      });
    });
  };

  const onDelete = async () => {
    startSubmitting(async () => {
      await deleteProduct(product.id).then((res) => {
        if (res.success) {
          toast({
            title: "Product deleted",
            description: "The product has been successfully deleted.",
          });
          router.push("/admin/dashboard/products");
        } else {
          toast({
            title: "An error occurred during product deletion",
            description: res.error,
          });
        }
      });
    });
  };

  return (
    <>
      <h1 className="mb-2 text-xl font-bold">Product information</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="imagesUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ProductGallery
                    images={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isSubmitting} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
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
                      {isFetching ? (
                        <LoadingDots dotsStyle="bg-primary" />
                      ) : (
                        <SelectValue placeholder="Pick a product category" />
                      )}
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
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} disabled={isSubmitting} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Tags</FormLabel>
            <FormControl>
              <ProductTagSelect
                tags={tags}
                onChange={(tags) => {
                  setTags(tags);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <div className="flex">
                    <Input
                      {...field}
                      className="rounded-r-none border-r-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      disabled={isSubmitting}
                    />
                    <span className="flex items-center text-nowrap rounded-r-lg border border-l-0 border-stone-200 bg-stone-100 px-3 text-center font-mono text-sm dark:border-stone-600 dark:bg-stone-800 dark:text-stone-400">
                      $ (USD)
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Quantity Mode</FormLabel>
            <RadioGroup
              className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
              defaultValue={isSizesMode.toString()}
              onValueChange={(value) => toggleSizeMode(value === "true")}
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="false"></RadioGroupItem>
                </FormControl>
                <div>
                  <FormLabel>
                    Use a single quantity metric for products without sizes
                  </FormLabel>
                  <FormDescription>
                    Choose this option for products that do not require size
                    variations.
                  </FormDescription>
                </div>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="true"></RadioGroupItem>
                </FormControl>
                <div>
                  <FormLabel>Use size-based quantity tracking</FormLabel>
                  <FormDescription>
                    This option is suitable for products with size variations.
                  </FormDescription>
                </div>
              </FormItem>
            </RadioGroup>
          </FormItem>

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  {isSizesMode ? (
                    <div className="flex justify-around gap-2">
                      {sizes.map((size, index) => (
                        <SizesToggleInput
                          key={size}
                          value={field.value}
                          onChange={field.onChange}
                          size={size}
                          index={index}
                        />
                      ))}
                    </div>
                  ) : (
                    <div>
                      <Input
                        value={field.value[0]}
                        onChange={(event) => {
                          field.onChange([event.target.value]);
                        }}
                      />
                    </div>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Featured item</FormLabel>
                  <FormDescription>
                    Featured items will be displayed on the homepage in the
                    featured section.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Save
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                disabled={isSubmitting}
                variant={"destructive"}
                className="w-full"
              >
                Delete product
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete product</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this product? This action
                  cannot be undone and the product will be permanently removed
                  from your store.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDelete}
                  className="bg-destructive hover:bg-destructive/80"
                >
                  Yes, delete product
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </Form>
    </>
  );
}
