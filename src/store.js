import { createStore, combineReducers } from "redux";

import productsOnCart from "./components/product_item/_reducers";

const reducers = combineReducers({
  productsOnCart
});

const store = createStore(reducers);

export default store;
