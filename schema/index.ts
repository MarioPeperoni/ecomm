import { z } from "zod";

export const StoreSchema = z.object({
  name: z.string().min(1),
  domain: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  admin: z.object({
    email: z.string().email(),
    username: z.string().min(1),
    password: z.string().min(1),
  }),
});
