import { create } from "zustand";

import { toast } from "@/hooks/use-toast";
import { persist, createJSONStorage } from "zustand/middleware";

import { CartProduct, ProductExtended } from "@/types/storeExtended";

interface CartStore {
  items: CartProduct[];
  addItem: (
    item: ProductExtended,
    quantityInCart: number,
    size: string | undefined | null,
  ) => void;
  setQuantity: (
    id: string,
    quantityInCart: number,
    size: string | undefined,
  ) => void;
  removeItem: (id: string, size: string | undefined) => void;
  clearCart: () => void;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],

      addItem: (item, quantityInCart, size) => {
        if (quantityInCart <= 0) {
          toast({
            title: "Invalid quantity",
            description: "Quantity must be greater than zero.",
            variant: "destructive",
          });
          return;
        }

        if (item.quantity.length > 1 && !size) {
          toast({
            title: "Size required",
            description: "Please select a size for this item.",
            variant: "destructive",
          });
          return;
        }

        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (cartItem) => cartItem.id === item.id && cartItem.size === size,
        );

        let updatedItems = [...currentItems];

        if (existingItemIndex > -1) {
          // Update quantity if item with the same size exists
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            cartQuantity:
              updatedItems[existingItemIndex].cartQuantity + quantityInCart,
          };
        } else {
          // Add new item to the cart
          updatedItems.push({
            ...item,
            cartQuantity: quantityInCart,
            size: size || undefined,
          });
        }

        set({ items: updatedItems });

        toast({
          title: "Item added to cart",
          description: `${item.name} has been added to your cart!`,
        });
      },

      setQuantity: (id, quantityInCart, size) => {
        if (quantityInCart <= 0) {
          toast({
            title: "Invalid quantity",
            description: "Quantity must be greater than zero.",
            variant: "destructive",
          });
          return;
        }

        const currentItems = get().items;
        const itemToUpdateIndex = currentItems.findIndex(
          (cartItem) => cartItem.id === id && cartItem.size === size,
        );

        if (itemToUpdateIndex === -1) {
          toast({
            title: "Item not found",
            description: "This item is not in your cart.",
            variant: "destructive",
          });
          return;
        }

        const updatedItems = [...currentItems];
        updatedItems[itemToUpdateIndex] = {
          ...updatedItems[itemToUpdateIndex],
          cartQuantity: quantityInCart,
        };

        set({ items: updatedItems });
      },

      removeItem: (id, size) => {
        const currentItems = get().items;
        const itemToRemoveIndex = currentItems.findIndex(
          (cartItem) => cartItem.id === id && cartItem.size === size,
        );

        if (itemToRemoveIndex === -1) {
          toast({
            title: "Item not found",
            description: "This item is not in your cart.",
            variant: "destructive",
          });
          return;
        }

        const updatedItems = currentItems.filter(
          (_, index) => index !== itemToRemoveIndex,
        );

        const itemToRemove = currentItems[itemToRemoveIndex];

        set({ items: updatedItems });

        toast({
          title: "Item removed from cart",
          description: `${itemToRemove.name} has been removed from your cart.`,
        });
      },

      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
