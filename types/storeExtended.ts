import { Billboard, Category, Store } from "@prisma/client";

export type StoreExtended = Store & {
  Billboards: Billboard[];
  Categories: CategoryExtended[];
};

export type CategoryExtended = Category & {
  Billboard: Billboard | null;
};
