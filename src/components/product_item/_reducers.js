export default function countProductsOnCart(state = 0, action) {
  switch (action.type) {
    case "SET_COUNT_PRODUCTS_ON_CART":
      return action.quantity;

    case "INCREMENT_COUNT_PRODUCTS_ON_CART":
      return state + action.quantity;

    case "CLEAR_COUNT_CART":
      return 0;

    default:
      return state;
  }
}
