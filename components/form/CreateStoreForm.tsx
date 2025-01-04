"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { createStore } from "@/actions/store";

import { toast } from "@/hooks/use-toast";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import InputWithIndent from "@/components/ui/inputWithIndent";

import LoadingDots from "@/components/loading/LoadingDots";

import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

import { storeCategoryLabels } from "@/types/storeCategory";
import { StoreSchema } from "@/schema/index";

export function CreateStoreFrom() {
  const [step, setStep] = useState(1);
  const [isSubmitting, startSubmitting] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof StoreSchema>>({
    resolver: zodResolver(StoreSchema),
    defaultValues: {
      name: "",
      domain: "",
      admin: {
        email: "test@test.pl",
        password: "test",
      },
    },
  });

  const validateStep = () => {
    const values = form.getValues();
    let isValid = true;

    // Validate step 1 fields: store name, domain, description, and category
    if (step === 1) {
      const { name, domain, description, category } = values;
      if (!name || !domain || !description || !category) {
        isValid = false;
      }
    }

    // Validate step 2 fields: admin username, email, password
    if (step === 2) {
      const { admin } = values;
      if (!admin?.email || !admin?.password) {
        isValid = false;
      }
    }

    return isValid;
  };

  const onSubmit = () => {
    startSubmitting(() => {
      createStore(form.getValues()).then((response) => {
        if (response.success) {
          router.replace(
            process.env.NEXT_PUBLIC_VERCEL_ENV
              ? `https://${response.store.domain}/admin`
              : `http://${response.store.domain}.localhost:3000/admin`,
          );
        }
        if (response.error) {
          toast({
            title: "An error occurred during store creation",
            description: response.error,
            variant: "destructive",
          });
        }
      });
    });
  };

  return (
    <div className={`flex transition-transform duration-500 ease-in-out`}>
      {/* Step 1: Store Configuration */}
      {step === 1 && (
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Store Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your store name (e.g., My Awesome Store)"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Store Domain */}
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
                        indentvalue=".ecomm.vercel.app"
                        direction="right"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Store Description */}
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

              {/* Store Category */}
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Button to Proceed to Admin Configuration */}
              <div className="flex justify-end">
                <Button onClick={() => validateStep() && setStep(2)}>
                  Configure Admin
                  <FaArrowRight />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}

      {/* Step 2: Admin Configuration */}
      {step == 2 && (
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Admin Email */}
              <FormField
                control={form.control}
                name="admin.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the admin's email address"
                        {...field}
                        type="email"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Admin Password */}
              <FormField
                control={form.control}
                name="admin.password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a secure password"
                        {...field}
                        type="password"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-6">
                <Button onClick={() => setStep(1)} variant="secondary">
                  <FaArrowLeft /> Back
                </Button>
                <div className="flex">
                  <Button type="submit" disabled={isSubmitting}>
                    {!isSubmitting ? (
                      "Submit"
                    ) : (
                      <LoadingDots dotsStyle="bg-secondary" />
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
