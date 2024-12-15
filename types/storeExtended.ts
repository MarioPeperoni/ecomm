import {
  Billboard,
  Category,
  Order,
  OrderItem,
  Product,
  Store,
  StoreStyle,
  Tag,
  TagGroup,
} from "@prisma/client";

export type StoreExtended = Store & {
  Categories: Category[];
  StoreStyle: StoreStyle | null;
};

export type CategoryExtended = Category & {
  Billboard: Billboard | null;
};

export type TagExtended = TagGroup & {
  Tags: Tag[];
};

export type ProductExtended = Product & {
  Category?: Category;
  Tags: Tag[];
};

export type OrderItemExtended = OrderItem & {
  Product: Product;
};

export type OrderExtended = Order & {
  OrderItems: OrderItemExtended[];
};

export type CartProduct = ProductExtended & {
  quantityInCart: number;
  size: string | undefined;
};
