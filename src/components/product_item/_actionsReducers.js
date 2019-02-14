export function addProductOnCart(quantity) {
  return {
    type: "ADD_PRODUCT_ON_CART",
    quantity
  };
}

export function clearCart() {
  return {
    type: "CLEAR_CART"
  };
}