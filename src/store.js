import { createStore, combineReducers } from "redux";

import countProductsOnCart from "./components/product_item/_reducers";

const reducers = combineReducers({
  countProductsOnCart
});

const store = createStore(reducers);

export default store;
