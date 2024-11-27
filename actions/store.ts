"use server";

import { createAdminUser } from "@/actions/auth";

import prismadb from "@/lib/prismadb";
import { createClient } from "@/utils/supabase/server";

import { z } from "zod";

import { SettingsSchema, StoreSchema } from "@/schema";
import { StoreCategory } from "@prisma/client";

/**
 * Creates a new store with the provided values.
 *
 * @param values - The values to create the store with, inferred from `StoreSchema`.
 * @returns An object containing either the created store on success or an error message on failure.
 */
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
    console.error("An error occurred during createStore action: ", error);
    return { error: error.message };
  }
};

/**
 * Updates the store with the given values.
 *
 * @param storeId - The ID of the store to update.
 * @param values - The new values to update the store with, validated against the SettingsSchema.
 * @returns An object indicating success or an error message. If the domain has changed, includes a redirect URL.
 *
 * @throws Will throw an error if the data is invalid, the user is not found, the store is not found, or the user is not authorized to update the store.
 */
export const updateStore = async (
  storeId: string,
  values: z.infer<typeof SettingsSchema>,
) => {
  try {
    const supabase = await createClient();
    const validatedFields = SettingsSchema.safeParse(values);

    if (!validatedFields.success) {
      throw new Error("Data is invalid");
    }

    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) {
      throw new Error("User not found");
    }

    const store = await prismadb.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      throw new Error("Store not found");
    }

    if (store.adminId !== user.id) {
      throw new Error("You are not authorized to update this store");
    }

    await prismadb.store.update({
      where: { id: storeId },
      data: { ...values, category: values.category as StoreCategory },
    });

    // Redirect to new domain if domain has changed
    if (values.domain !== store.domain) {
      return { success: true, redirect: values.domain };
    }

    return { success: true };
  } catch (error: any) {
    console.error("An error occurred during updateStore action: ", error);
    return { error: error.message };
  }
};

/**
 * Deletes a store by its ID.
 *
 * @param id - The ID of the store to delete.
 * @returns An object indicating the success of the operation or an error message.
 */
export const deleteStore = async (id: string) => {
  try {
    const supabase = await createClient();

    const store = await prismadb.store.findUnique({
      where: { id },
    });

    if (!store) {
      throw new Error("Store not found");
    }

    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) {
      throw new Error("User not found");
    }

    if (store.adminId !== user.id) {
      throw new Error("You are not authorized to delete this store");
    }

    await prismadb.store.delete({
      where: { id },
    });

    return { success: true };
  } catch (error: any) {
    console.error("An error occurred during deleteStore action: ", error);
    return { error: error.message };
  }
};
