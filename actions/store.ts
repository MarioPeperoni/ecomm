"use server";

import { createAdminUser } from "@/actions/auth";

import prismadb from "@/lib/prismadb";

import { z } from "zod";

import { StoreSchema } from "@/schema";
import { StoreCategory } from "@prisma/client";

export const createStore = async (values: z.infer<typeof StoreSchema>) => {
  try {
    const validatedFields = StoreSchema.safeParse(values);

    if (!validatedFields.success) {
      throw new Error("Data is invalid");
    }

    const user = await createAdminUser({
      email: values.admin.email,
      password: values.admin.password,
    });

    if (!user) {
      throw new Error("Failed to create admin user");
    }

    const store = await prismadb.store.create({
      data: {
        name: values.name,
        domain: values.domain,
        description: values.description,
        category: values.category as StoreCategory,
        adminId: user!.id as string,
      },
    });

    return { success: true, store };
  } catch (error: any) {
    return { error: error.message };
  }
};
