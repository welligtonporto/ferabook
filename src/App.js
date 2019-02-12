import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './components/home/Home';
import ShoppingCart from './components/shopping_cart/ShoppingCart';
import DefaultLayout from './components/default_layout/DefaultLayout';
import OrderCompleted from './components/order_completed/OrderCompleted';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          {/* // TODO: Rever isso */}
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

          <DefaultLayout exact path="/" component={Home} />
          <DefaultLayout path="/cart" component={ShoppingCart}/>
          <DefaultLayout path="/order-completed" component={OrderCompleted}/>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
