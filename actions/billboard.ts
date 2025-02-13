"use server";

import { initStoreUpdate } from "@/actions/store";

import prismadb from "@/lib/prismadb";

import { z } from "zod";
import { BillboardSchema } from "@/schema";

import { FontName } from "@prisma/client";

/**
 * Creates a new billboard entry in the database.
 *
 * @param values - The values for the new billboard, inferred from the BillboardSchema.
 */
export const createBillboard = async (
  values: z.infer<typeof BillboardSchema>,
) => {
  try {
    const store = await initStoreUpdate();

    const validatedFields = BillboardSchema.safeParse(values);
    if (!validatedFields.success) {
      throw new Error("Data is invalid");
    }

    await prismadb.billboard.create({
      data: {
        ...values,
        imageUrl: values.imageUrl ?? "",
        fontName: values.fontName as FontName,
        Store: {
          connect: {
            id: store.id,
          },
        },
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error(
      "An error occurred during createBillboard action: ",
      error.message,
    );
    return { error: error.message };
  }
};

/**
 * Updates a billboard with the provided values.
 *
 * @param values - The values to update the billboard with, inferred from BillboardSchema.
 * @param billboardId - The ID of the billboard to be updated.
 */
export const updateBillboard = async (
  values: z.infer<typeof BillboardSchema>,
  billboardId: string,
) => {
  try {
    await initStoreUpdate();

    const validatedFields = BillboardSchema.safeParse(values);
    if (!validatedFields.success) {
      throw new Error("Data is invalid");
    }

    await prismadb.billboard.update({
      where: {
        id: billboardId,
      },
      data: {
        ...values,
        fontName: values.fontName as FontName,
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error(
      "An error occurred during updateBillboard action: ",
      error.message,
    );
    return { error: error.message };
  }
};

/**
 * Deletes a billboard from the database for a given store.
 *
 * @param billboardId - The ID of the billboard to be deleted.
 */
export const deleteBillboard = async (billboardId: string) => {
  try {
    await initStoreUpdate();

    await prismadb.billboard.delete({
      where: {
        id: billboardId,
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error(
      "An error occurred during deleteBillboard action: ",
      error.message,
    );
    return { error: error.message };
  }
};
