import { Billboard, Category, Store } from "@prisma/client";

export type StoreExtended = Store & {
  Categories: Category[];
};

export type CategoryExtended = Category & {
  Billboard: Billboard | null;
};
