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
