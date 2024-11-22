"use client";

import { login } from "@/actions/auth";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { useStore } from "@/hooks/store-context";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "@/schema/index";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { LoginError } from "@/components/auth/LoginError";

export const LoginForm = () => {
  const store = useStore();
  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [isLoggingIn, startLoggingIn] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startLoggingIn(() => {
      login(values, store.id).then((data) => {
        if (data.success) {
          router.push(data.redirectUrl);
        } else {
          setError(data.error);
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admin Mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="eg. example@example.com"
                  disabled={isLoggingIn}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admin Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="********"
                  disabled={isLoggingIn}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div></div>
        <LoginError message={error} />
        <Button type="submit" className="w-full" disabled={isLoggingIn}>
          Login
        </Button>
        <FormDescription className="text-center">
          <a href="#" className="text-center hover:underline">
            Password forgor.
          </a>
        </FormDescription>
      </form>
    </Form>
  );
};
