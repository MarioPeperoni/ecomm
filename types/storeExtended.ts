import { Billboard, Category, Store, Tag, TagGroup } from "@prisma/client";

export type StoreExtended = Store & {
  Categories: Category[];
};

export type CategoryExtended = Category & {
  Billboard: Billboard | null;
};

export type TagExtended = TagGroup & {
  Tags: Tag[];
};
