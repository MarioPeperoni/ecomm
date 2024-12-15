export default function getProductQuantity(quantity: number[]) {
  if (quantity.length > 1) {
    return quantity.reduce((acc, curr) => acc + curr);
  } else {
    return quantity[0];
  }
}

export function getProductQuantityForSize(quantity: number[], size: string) {
  const sizes = ["XS", "S", "M", "L", "XL"];
  const index = sizes.indexOf(size);

  if (index === -1) {
    return 0;
  }

  return quantity[index];
}
