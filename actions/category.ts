"use server";

import { initStoreUpdate } from "@/actions/store";

import { z } from "zod";
import { CategorySchema } from "@/schema";

import prismadb from "@/lib/prismadb";

/**
 * Creates a new category for a given store.
 *
 * @param values - The category data to be validated and created.
 */
export const createCategory = async (
  values: z.infer<typeof CategorySchema>,
) => {
  try {
    const store = await initStoreUpdate();

    const validatedFields = CategorySchema.safeParse(values);
    if (!validatedFields.success) {
      throw new Error("Data is invalid");
    }

    // Check if the store does not have a category with the same name
    const existingCategory = await prismadb.category.findFirst({
      where: {
        name: values.name,
        Store: { id: store.id },
      },
    });

    if (existingCategory) {
      throw new Error("A category with the same name already exists");
    }

    await prismadb.category.create({
      data: {
        name: values.name,
        Store: { connect: { id: store.id } },
        Billboard: values.billboardId
          ? { connect: { id: values.billboardId } }
          : undefined,
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error(
      "An error occurred during createCategory action: ",
      error.message,
    );
    return { error: error.message };
  }
};

/**
 * Updates a category in the store.
 *
 * @param values - The values to update the category with, validated against `CategorySchema`.
 * @param categoryId - The ID of the category to be updated.
 */
export const updateCategory = async (
  values: z.infer<typeof CategorySchema>,
  categoryId: string,
) => {
  try {
    const store = await initStoreUpdate();

    const validatedFields = CategorySchema.safeParse(values);
    if (!validatedFields.success) {
      throw new Error("Data is invalid");
    }

    // Check if the store does not have a category with the same name
    const existingCategory = await prismadb.category.findFirst({
      where: {
        name: values.name,
        Store: { id: store.id },
      },
    });

    if (existingCategory && existingCategory.id !== categoryId) {
      throw new Error("A category with the same name already exists");
    }

    await prismadb.category.update({
      where: { id: categoryId },
      data: {
        name: values.name,
        Billboard: values.billboardId
          ? { connect: { id: values.billboardId } }
          : undefined,
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error(
      "An error occurred during updateCategory action: ",
      error.message,
    );
    return { error: error.message };
  }
};

/**
 * Deletes a category from the store.
 *
 * @param categoryId - The ID of the category to be deleted.
 */
export const deleteCategory = async (categoryId: string) => {
  try {
    await initStoreUpdate();

    await prismadb.category.delete({ where: { id: categoryId } });

    return { success: true };
  } catch (error: any) {
    console.error(
      "An error occurred during deleteCategory action: ",
      error.message,
    );
    return { error: error.message };
  }
};
