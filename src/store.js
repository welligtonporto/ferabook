import { createStore, combineReducers } from "redux";

import countProductsOnCart from "./components/product_item/_reducers";
import checkinIsVisible from "./components/checkin/_reducers";

const reducers = combineReducers({
  countProductsOnCart,
  checkinIsVisible
});

const store = createStore(reducers);

export default store;
