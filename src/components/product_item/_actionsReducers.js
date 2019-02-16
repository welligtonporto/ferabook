export function setCountProductsOnCart(quantity) {
  return {
    type: "SET_COUNT_PRODUCTS_ON_CART",
    quantity
  };
}

export function incrementCountProductsOnCart(quantity) {
  return {
    type: "INCREMENT_COUNT_PRODUCTS_ON_CART",
    quantity
  };
}

export function clearCountCart() {
  return {
    type: "CLEAR_COUNT_CART"
  };
}