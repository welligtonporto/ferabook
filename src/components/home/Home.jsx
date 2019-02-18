import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

import ProductItem from './../product_item/ProductItem'
import Load from './../load/Load'

import { getMainProducts } from './../../models/ProductModel.js';

class Home extends Component {
  state = {
    isLoading: true,
    products: {}
  };

  componentDidMount = () => {
    this.getProducts();
  };

  getProducts = async () => {
    try {
      let response = await getMainProducts();

      this.setState({
        isLoading: false,
        products: response.items
      });
    } catch {
      this.setState({
        isLoading: false
      });
    }
  }

  render() {
    let { isLoading, products } = this.state;

    if (isLoading) return <Load />;

    return (
      <Grid container spacing={24} alignItems="stretch">
        {products.length && products.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductItem data={product} />
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default Home;
