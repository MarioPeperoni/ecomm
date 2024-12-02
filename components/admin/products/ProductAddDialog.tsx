"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ProductAddForm from "@/components/admin/products/ProductAddForm";

export default function ProductAddDialog() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create new product</DialogTitle>
        <DialogDescription>
          Input basic information about the product
        </DialogDescription>
      </DialogHeader>
      <ProductAddForm />
    </DialogContent>
  );
}
