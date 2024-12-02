"use server";

import { initStoreUpdate } from "@/actions/store";

import prismadb from "@/lib/prismadb";
import { z } from "zod";
import { NewProductSchema, ProductSchema } from "@/schema";

import { Tag } from "@prisma/client";

/**
 * Adds a new product to the database.
 *
 * @param values - The product data to be added, validated against `NewProductSchema`.
 */
export const addProduct = async (values: z.infer<typeof NewProductSchema>) => {
  try {
    const store = await initStoreUpdate();

    const validatedFields = NewProductSchema.safeParse(values);
    if (!validatedFields.success) {
      throw new Error("Data is invalid");
    }

    const product = await prismadb.product.create({
      data: {
        name: values.name,
        description: "",
        price: 0,
        imagesUrl: [],
        isFeatured: false,
        quantity: [0],
        Category: {
          connect: {
            id: values.category,
          },
        },
        Store: {
          connect: {
            id: store.id,
          },
        },
      },
    });

    return { productId: product.id, success: true };
  } catch (error: any) {
    console.error(
      "An error occurred during addProduct action: ",
      error.message,
    );
    return { error: error.message };
  }
};

/**
 * Edits an existing product with the provided values.
 *
 * @param values - The new values for the product, validated against the ProductSchema.
 * @param productId - The ID of the product to be edited.
 */
export const editProduct = async (
  values: z.infer<typeof ProductSchema>,
  tags: Tag[],
  productId: string,
) => {
  try {
    const store = await initStoreUpdate();

    const validatedFields = ProductSchema.safeParse(values);
    if (!validatedFields.success) {
      throw new Error("Data is invalid");
    }

    await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        name: values.name,
        price: values.price,
        imagesUrl: values.imagesUrl,
        quantity: values.quantity,
        isFeatured: values.isFeatured,
        description: values.description,
        Category: {
          connect: {
            id: values.categoryId,
          },
        },
        Store: {
          connect: {
            id: store.id,
          },
        },
        ProductTag: {
          deleteMany: {
            productId,
          },
          create: tags.map((tag) => ({
            Tag: {
              connect: {
                id: tag.id,
              },
            },
          })),
        },
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error(
      "An error occurred during editProduct action: ",
      error.message,
    );
    return { error: error.message };
  }
};

/**
 * Deletes a product from the database by its ID.
 *
 * @param productId - The ID of the product to be deleted.
 */
export const deleteProduct = async (productId: string) => {
  try {
    await initStoreUpdate();

    await prismadb.product.delete({
      where: {
        id: productId,
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error(
      "An error occurred during deleteProduct action: ",
      error.message,
    );
    return { error: error.message };
  }
};
