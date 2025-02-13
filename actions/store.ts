"use server";

import { createAdminUser } from "@/actions/auth";

import getDomain from "@/data/domain";

import prismadb from "@/lib/prismadb";
import { createClient } from "@/utils/supabase/server";

import { z } from "zod";

import { SettingsSchema, StoreSchema } from "@/schema";
import { StoreCategory } from "@prisma/client";

/**
 * Creates a new store with the provided values.
 *
 * @param values - The values to create the store with, inferred from `StoreSchema`.
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
    console.error(
      "An error occurred during createStore action: ",
      error.message,
    );
    return { error: error.message };
  }
};

/**
 * Updates the store with the given values.
 *
 * @param values - The new values to update the store with, validated against the SettingsSchema.
 *
 * @throws Will throw an error if the data is invalid, the user is not found, the store is not found, or the user is not authorized to update the store.
 */
export const updateStore = async (values: z.infer<typeof SettingsSchema>) => {
  try {
    const store = await initStoreUpdate();
    const validatedFields = SettingsSchema.safeParse(values);

    if (!validatedFields.success) {
      throw new Error("Data is invalid");
    }

    await prismadb.store.update({
      where: { id: store.id },
      data: { ...values, category: values.category as StoreCategory },
    });

    // Redirect to new domain if domain has changed
    if (values.domain !== store.domain) {
      return { success: true, redirect: values.domain };
    }

    return { success: true };
  } catch (error: any) {
    console.error(
      "An error occurred during updateStore action: ",
      error.message,
    );
    return { error: error.message };
  }
};

/**
 * Deletes a store by its ID.
 *
 */
export const deleteStore = async () => {
  try {
    const store = await initStoreUpdate();

    await prismadb.store.delete({
      where: { id: store.id },
    });

    return { success: true };
  } catch (error: any) {
    console.error(
      "An error occurred during deleteStore action: ",
      error.message,
    );
    return { error: error.message };
  }
};
/**
 * Initializes the store update process by verifying the current user and their authorization.
 *
 * @returns A promise that resolves to the store object if the user is authorized.
 * @throws Will throw an error if the user is not found, the store is not found, or the user is not authorized to make changes to the store.
 */
export const initStoreUpdate = async () => {
  const supabase = await createClient();

  // Get the current user
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    throw new Error(error?.message || "User not found");
  }

  const user = data.user;

  // Get the current domain
  const domain = await getDomain();

  // Get store by domain
  const store = await prismadb.store.findUnique({
    where: { domain: domain },
  });

  if (!store) {
    throw new Error("Store not found");
  }

  if (store.adminId !== user.id) {
    throw new Error("You are not authorized to make changes to this store");
  }

  return store;
};
