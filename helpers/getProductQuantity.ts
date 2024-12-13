export default function getProductQuantity(quantity: number[]) {
  if (quantity.length > 1) {
    return quantity.reduce((acc, curr) => acc + curr);
  } else {
    return quantity[0];
  }
}
