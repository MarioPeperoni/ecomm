"use server";

import prismadb from "@/lib/prismadb";
import { StoreCategory } from "@prisma/client";

import { z } from "zod";
import { StoreSchema } from "@/schema";

export const createStore = async (values: z.infer<typeof StoreSchema>) => {
  try {
    const validatedFields = StoreSchema.safeParse(values);

    if (!validatedFields.success) {
      throw new Error("Data is invalid");
    }

    const hashedPassword = await Bun.password.hash(values.admin.password);

    const store = await prismadb.store.create({
      data: {
        name: values.name,
        domain: values.domain,
        description: values.description,
        category: values.category as StoreCategory,
        StoreAdmin: {
          create: {
            username: values.admin.username,
            email: values.admin.email,
            password: hashedPassword,
          },
        },
      },
    });

    return { success: true, store };
  } catch (error: any) {
    console.error(error);
    return { error: error.message };
  }
};
