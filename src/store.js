import { createStore, combineReducers } from "redux";

import countProductsOnCart from "./components/product_item/_reducers";
import { checkinIsVisible, user } from "./components/checkin/_reducers";
import { userAdmin } from "./components/admin_login/_reducers";

const reducers = combineReducers({
  countProductsOnCart,
  checkinIsVisible,
  user,
  userAdmin
});

const store = createStore(reducers);

export default store;
