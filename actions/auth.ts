"use server";

import prismadb from "@/lib/prismadb";
import { createClient } from "@/utils/supabase/server";

import { z } from "zod";

import { LoginSchema } from "@/schema";

export async function login(
  values: z.infer<typeof LoginSchema>,
  storeId: string,
) {
  try {
    const supabase = await createClient();

    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
      throw new Error("Data is invalid");
    }

    const { error, data } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    // Check if user is admin of the store
    const store = await prismadb.store.findFirst({
      where: {
        id: storeId,
      },
    });

    if (store?.adminId !== data?.user?.id) {
      throw new Error("You are not authorized to access this store");
    }

    if (!store) {
      throw new Error("Store not found");
    }

    const redirectUrl = process.env.NEXT_PUBLIC_VERCEL_ENV
      ? `https://${store.domain}/admin/dashboard`
      : `http://${store.domain}.localhost:3000/admin/dashboard`;

    return { success: true, redirectUrl };
  } catch (error: any) {
    console.error("An error occurred during login action: ", error.message);
    return { error: error.message };
  }
}

export async function createAdminUser(values: {
  email: string;
  password: string;
}) {
  try {
    const supabase = await createClient();

    const { error, data } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data.user;
  } catch (error: any) {
    console.error(
      "An error occurred during createAdminUser action: ",
      error.message,
    );
    return null;
  }
}

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();
}
