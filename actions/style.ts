"use server";

import { initStoreUpdate } from "@/actions/store";

import { z } from "zod";
import prismadb from "@/lib/prismadb";

import { FontName } from "@prisma/client";
import { StyleSchema } from "@/schema";

export const editStyle = async (values: z.infer<typeof StyleSchema>) => {
  try {
    const store = await initStoreUpdate();

    const validatedFields = StyleSchema.safeParse(values);
    if (!validatedFields.success) {
      throw new Error("Data is invalid");
    }

    const storeStyle = await prismadb.storeStyle.findFirst({
      where: {
        storeId: store.id,
      },
    });

    if (!storeStyle) {
      await prismadb.storeStyle.create({
        data: {
          ...values,
          primaryColor: values.primaryColor,
          fontName: values.fontName as FontName,
          Store: {
            connect: {
              id: store.id,
            },
          },
        },
      });
    } else {
      await prismadb.storeStyle.update({
        where: {
          id: storeStyle.id,
        },
        data: {
          ...values,
          primaryColor: values.primaryColor,
          fontName: values.fontName as FontName,
        },
      });
    }

    return { success: true };
  } catch (error: any) {
    console.error("An error occurred during editStyle action: ", error.message);
    return { error: error.message };
  }
};
