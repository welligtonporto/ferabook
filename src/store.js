import { createStore, combineReducers } from "redux";

import countProductsOnCart from "./components/product_item/_reducers";
import { checkinIsVisible, user } from "./components/checkin/_reducers";

const reducers = combineReducers({
  countProductsOnCart,
  checkinIsVisible,
  user
});

const store = createStore(reducers);

export default store;
