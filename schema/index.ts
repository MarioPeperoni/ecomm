import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const StoreSchema = z.object({
  name: z.string().min(1),
  domain: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  admin: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
});

export const SettingsSchema = z.object({
  name: z.string().min(1),
  domain: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
});

export const BillboardSchema = z.object({
  label: z.string().min(1),
  text: z.string().optional(),
  fontName: z.string().min(1),
  imageUrl: z.string().optional(),
});

export const CategorySchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().optional(),
});

export const TagSchema = z.object({
  name: z.string().min(1),
  tags: z.array(z.string()),
});

export const NewProductSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
});

export const ProductSchema = z.object({
  name: z.string().min(1),
  categoryId: z.string().min(1),
  description: z.string().optional(),
  price: z.coerce
    .number({ message: "Price must be valid" })
    .positive({ message: "Price must be set" }),
  imagesUrl: z.array(z.string()),
  isFeatured: z.boolean(),
  quantity: z.array(z.coerce.number()).refine(
    (quantities) => {
      if (quantities.length === 1) {
        return quantities[0] > 0;
      } else {
        return quantities.some((value) => value > 1);
      }
    },
    {
      message:
        "Product must have at least one size with quantity greater than 0",
    },
  ),
});
