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
 */
export const createTagGroup = async (values: z.infer<typeof TagSchema>) => {
  try {
    const store = await initStoreUpdate();

    const validatedFields = TagSchema.safeParse(values);
    if (!validatedFields.success) {
      throw new Error("Data is invalid");
    }

    // Check if the tag group already exists
    const existingTagGroup = await prismadb.tagGroup.findFirst({
      where: {
        name: values.name,
        Store: {
          id: store.id,
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
            id: store.id,
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
 */
export const updateTagGroup = async (
  values: z.infer<typeof TagSchema>,
  tagObjectsRef: Tag[],
  groupTagId: string,
) => {
  try {
    const store = await initStoreUpdate();

    const validatedFields = TagSchema.safeParse(values);
    if (!validatedFields.success) {
      throw new Error("Data is invalid");
    }

    // Check if you are not renaming the tag group to an existing name
    const existingTagGroup = await prismadb.tagGroup.findFirst({
      where: {
        name: values.name,
        Store: {
          id: store.id,
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

    // Get tags names from values.tags that are not in the tagObjectsRef
    const newTags = values.tags.filter(
      (tag) => !tagObjectsRef.map((t) => t.name).includes(tag),
    );

    for (const tag of newTags) {
      await prismadb.tag.create({
        data: {
          name: tag,
          index: values.tags.indexOf(tag),
          TagGroup: {
            connect: {
              id: groupTagId,
            },
          },
        },
      });
    }

    // Compare the updated tags with the existing tags by IDs, make changes accordingly
    for (const tag of tagObjectsRef) {
      const dbTag = dbTags.find((t) => t.id === tag.id);

      if (dbTag) {
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
 */
export const deleteTagGroup = async (tagGroupId: string) => {
  try {
    await initStoreUpdate();

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
