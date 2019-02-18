import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store";

import Home from './components/home/Home';
import ShoppingCart from './components/shopping_cart/ShoppingCart';
import DefaultLayout from './components/default_layout/DefaultLayout';
import AdminLayout from './components/admin_layout/AdminLayout';
import OrderCompleted from './components/order_completed/OrderCompleted';
import UserOrders from './components/user_orders/UserOrders';

import AdminOrders from './components/admin_orders/AdminOrders';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

            <DefaultLayout exact path="/" component={Home} />
            <DefaultLayout path="/cart" component={ShoppingCart}/>
            <DefaultLayout path="/order-completed" component={OrderCompleted}/>
            <DefaultLayout path="/my-orders" component={UserOrders}/>
            {/* <AdminLayout path="/admin" component={AdminLogin}/> */}
            <AdminLayout path="/admin/orders" component={AdminOrders}/>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;