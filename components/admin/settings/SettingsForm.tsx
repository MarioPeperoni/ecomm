"use client";

import { updateStore } from "@/actions/store";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { useStore } from "@/hooks/use-store";
import { toast } from "@/hooks/use-toast";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { SettingsSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InputWithIndent from "@/components/ui/inputWithIndent";

import DestructiveOptionsCard from "@/components/admin/settings/DestructiveOptionsCard";

import { storeCategoryLabels } from "@/types/storeCategory";

export default function SettingsForm() {
  const [isSubmitting, startSubmitting] = useTransition();
  const store = useStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: store.name,
      domain: store.domain,
      description: store.description,
      category: store.category,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startSubmitting(() => {
      updateStore(values).then((res) => {
        if (res.success) {
          if (res.redirect) {
            toast({
              title: "Store updated successfully",
              description:
                "You will be redirected to the new domain shortly...",
            });

            // Redirect to new domain if domain has changed
            setTimeout(() => {
              router.replace(
                process.env.NEXT_PUBLIC_VERCEL_ENV
                  ? `https://${res.redirect}/admin`
                  : `http://${res.redirect}.localhost:3000/admin`,
              );
            }, 3000);
          } else {
            toast({
              title: "Store updated successfully",
              description: "Your changes has been saved",
            });
            router.refresh();
          }
        } else {
          toast({
            title: "An error occurred during store update",
            description: res.error,
          });
        }
      });
    });
  };

  return (
    <section className="m-2 mx-auto max-w-[800px] justify-center space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shop name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Shop name"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Domain</FormLabel>
                <FormControl>
                  <InputWithIndent
                    placeholder="your-store-name"
                    {...field}
                    autoCapitalize="none"
                    disabled={isSubmitting}
                    indentValue=".ecomm.vercel.app"
                    direction="right"
                  />
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
                <FormLabel>Store Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write a brief description of your store..."
                    {...field}
                    className="resize-none"
                    disabled={isSubmitting}
                  />
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
                <FormLabel>Shop category</FormLabel>
                <FormControl>
                  <div>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(storeCategoryLabels).map(
                          ([key, label]) => (
                            <SelectItem key={key} value={key}>
                              {label}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting} className="w-full">
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />
      <DestructiveOptionsCard />
    </section>
  );
}
