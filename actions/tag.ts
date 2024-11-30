"use server";

import { initStoreUpdate } from "@/actions/store";

import prismadb from "@/lib/prismadb";

import { z } from "zod";
import { TagSchema } from "@/schema";

import { Tag } from "@prisma/client";

/**
 * Creates a new tag group and its associated tags for a given store.
 *
 * @param values - The values to create the tag group, validated against `TagSchema`.
 * @param storeId - The ID of the store where the tag group will be created.
 */
export const createTagGroup = async (
  values: z.infer<typeof TagSchema>,
  storeId: string,
) => {
  try {
    await initStoreUpdate(storeId);

    const validatedFields = TagSchema.safeParse(values);
    if (!validatedFields.success) {
      throw new Error("Data is invalid");
    }

    // Check if the tag group already exists
    const existingTagGroup = await prismadb.tagGroup.findFirst({
      where: {
        name: values.name,
        Store: {
          id: storeId,
        },
      },
    });

    if (existingTagGroup) {
      throw new Error("Tag group already exists");
    }

    // Create the tag group
    const tagGroup = await prismadb.tagGroup.create({
      data: {
        name: values.name,
        Store: {
          connect: {
            id: storeId,
          },
        },
      },
    });

    // Create tags for the tag group
    for (const tag of values.tags) {
      await prismadb.tag.create({
        data: {
          name: tag,
          index: values.tags.indexOf(tag),
          TagGroup: {
            connect: {
              id: tagGroup.id,
            },
          },
        },
      });
    }

    return { success: true };
  } catch (error: any) {
    console.error(
      "An error occurred during createTagGroup action: ",
      error.message,
    );
    return { error: error.message };
  }
};

/**
 * Updates a tag group and its associated tags in the database.
 *
 * @param values - The values to update the tag group with, validated against `TagSchema`.
 * @param tagObjectsRef - An array of tag objects to update or create.
 * @param groupTagId - The ID of the tag group to update.
 * @param storeId - The ID of the store to which the tag group belongs.
 */
export const updateTagGroup = async (
  values: z.infer<typeof TagSchema>,
  tagObjectsRef: Tag[],
  groupTagId: string,
  storeId: string,
) => {
  try {
    await initStoreUpdate(storeId);

    const validatedFields = TagSchema.safeParse(values);
    if (!validatedFields.success) {
      throw new Error("Data is invalid");
    }

    // Check if you are not renaming the tag group to an existing name
    const existingTagGroup = await prismadb.tagGroup.findFirst({
      where: {
        name: values.name,
        Store: {
          id: storeId,
        },
      },
    });

    if (existingTagGroup && existingTagGroup.id !== groupTagId) {
      throw new Error("Tag group already exists");
    }

    // Update the tag group
    await prismadb.tagGroup.update({
      where: {
        id: groupTagId,
      },
      data: {
        name: values.name,
      },
    });

    const dbTags = await prismadb.tag.findMany({
      where: {
        TagGroup: {
          id: groupTagId,
        },
      },
    });

    // Compare the updated tags with the existing tags by IDs, make changes accordingly
    for (const tag of tagObjectsRef) {
      const dbTag = dbTags.find((t) => t.id === tag.id);

      if (!dbTag) {
        // Create new tag
        await prismadb.tag.create({
          data: {
            name: tag.name,
            index: tag.index,
            TagGroup: {
              connect: {
                id: groupTagId,
              },
            },
          },
        });
      } else {
        // Update existing tag
        await prismadb.tag.update({
          where: {
            id: tag.id,
          },
          data: {
            name: tag.name,
            index: tag.index,
          },
        });
      }
    }

    // Delete tags that are not in the updated tags
    for (const dbTag of dbTags) {
      const tag = tagObjectsRef.find((t) => t.id === dbTag.id);

      if (!tag) {
        await prismadb.tag.delete({
          where: {
            id: dbTag.id,
          },
        });
      }
    }

    return { success: true };
  } catch (error: any) {
    console.error(
      "An error occurred during updateTagGroup action: ",
      error.message,
    );
    return { error: error.message };
  }
};

/**
 * Deletes a tag group by its ID for a specific store.
 *
 * @param tagGroupId - The ID of the tag group to delete.
 * @param storeId - The ID of the store associated with the tag group.
 */
export const deleteTagGroup = async (tagGroupId: string, storeId: string) => {
  try {
    await initStoreUpdate(storeId);

    await prismadb.tagGroup.delete({
      where: {
        id: tagGroupId,
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error(
      "An error occurred during deleteTagGroup action: ",
      error.message,
    );
    return { error: error.message };
  }
};
