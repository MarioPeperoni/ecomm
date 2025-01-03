"use client";

import { editStyle } from "@/actions/style";

import { useTransition } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyleSchema } from "@/schema";

import { toast } from "@/hooks/use-toast";
import { useStore } from "@/hooks/use-store";

import ColorPicker from "@/components/admin/style/ColorPicker";
import LogoDisplay from "@/components/admin/style/LogoDisplay";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

import { FontName, fontNameLabels } from "@/types/fontName";

export default function StyleForm() {
  const [isSubmitting, startSubmitting] = useTransition();
  const store = useStore();

  const style = store.StoreStyle || {
    logoUrl: "",
    primaryColor: "",
    radius: "",
    fontName: "ARIAL" as FontName,
  };

  const form = useForm<z.infer<typeof StyleSchema>>({
    resolver: zodResolver(StyleSchema),
    defaultValues: {
      logoUrl: style.logoUrl,
      primaryColor: style.primaryColor.replace("#", "").toUpperCase() || "SEX",
      radius: style.radius || "0rem",
      fontName: style.fontName || "ARIAL",
    },
  });

  const onSubmit = (values: z.infer<typeof StyleSchema>) => {
    startSubmitting(async () => {
      // Add # in the beginning of the color
      values.primaryColor = "#" + values.primaryColor;
      await editStyle(values).then((res) => {
        if (res.success) {
          toast({
            title: "Store style updated",
            description: "The changes have been saved successfully",
          });
          window.location.reload();
        } else {
          toast({
            title: "An error occurred while saving changes",
            description: res.error,
            variant: "destructive",
          });
        }
      });
    });
  };

  return (
    <div className="m-2 mx-auto max-w-[800px] justify-center space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="logoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store logo</FormLabel>
                <FormControl>
                  <LogoDisplay field={field} />
                </FormControl>
                <FormDescription>
                  The logo that will be displayed on navigation bar. If no image
                  is uploaded, the store name will be displayed instead.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="primaryColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Color</FormLabel>
                <FormControl>
                  <ColorPicker field={field} />
                </FormControl>
                <FormDescription>
                  Choose the primary color that will be used for buttons, links,
                  and other key elements in your store's design.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="radius"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Radius of borders</FormLabel>
                <FormControl className="rounded-[--radius] border bg-card text-card-foreground shadow-sm">
                  <div className="flex gap-2 p-4">
                    <Slider
                      value={[parseFloat(field.value)]}
                      onValueChange={(val) =>
                        field.onChange(val[0].toString() + "rem")
                      }
                      max={1}
                      min={0}
                      step={0.1}
                    />
                    <span className="text-sm">{field.value}</span>
                  </div>
                </FormControl>
                <FormDescription>
                  The radius of the borders that will be used throughout the
                  store. It determines how rounded the corners of elements will
                  be.
                </FormDescription>
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
                        <SelectValue placeholder="Pick font family" />
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
                <FormDescription>
                  The font family that will be used throughout the store.
                </FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting} className="w-full">
            Save changes
          </Button>
        </form>
      </Form>
    </div>
  );
}
