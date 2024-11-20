export const StoreCategory = {
  GROCERY: "GROCERY",
  ELECTRONICS: "ELECTRONICS",
  CLOTHING: "CLOTHING",
  BOOKS: "BOOKS",
  FURNITURE: "FURNITURE",
} as const;

export type StoreCategory = keyof typeof StoreCategory;

export const storeCategoryLabels: Record<StoreCategory, string> = {
  GROCERY: "Groceries",
  ELECTRONICS: "Electronics",
  CLOTHING: "Clothing",
  BOOKS: "Books",
  FURNITURE: "Furniture",
};
