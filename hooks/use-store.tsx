"use client";

import React, { createContext, useContext } from "react";

import { StoreExtended } from "@/types/storeExtended";

const StoreContext = createContext<StoreExtended | null>(null);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};

export const StoreProvider = ({
  store,
  children,
}: {
  store: StoreExtended;
  children: React.ReactNode;
}) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
