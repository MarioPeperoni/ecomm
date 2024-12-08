import {
  Billboard,
  Category,
  Product,
  Store,
  Tag,
  TagGroup,
} from "@prisma/client";

export type StoreExtended = Store & {
  Categories: Category[];
};

export type CategoryExtended = Category & {
  Billboard: Billboard | null;
};

export type TagExtended = TagGroup & {
  Tags: Tag[];
};

export type ProductExtended = Product & {
  Category: Category;
  Tags: Tag[];
};
