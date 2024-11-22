"use client";

import { useStore } from "@/hooks/store-context";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LoginForm } from "@/components/auth/LoginForm";

export const LoginCard = () => {
  const store = useStore();

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Administrator login for {store.name}</CardTitle>
        <CardDescription>Enter your login credentials below</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
};
