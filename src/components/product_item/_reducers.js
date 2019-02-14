export default function productsOnCart(state = 0, action) {
  switch (action.type) {
    case "ADD_PRODUCT_ON_CART":
      return state + action.quantity;

    case "CLEAR_CART":
      return 0;

    default:
      return state;
  }
}
