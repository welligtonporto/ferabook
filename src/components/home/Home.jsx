import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

import ProductItem from './../product_item/ProductItem'
import Load from './../load/Load'

class Home extends Component {
  state = {
    isLoading: true,
    products: {}
  };

  componentDidMount() {
    this.getProducts();
  };

  getProducts = () => {
    // TODO: Mudar para API
    this.setState({
      isLoading: false,
      products: [
        {
          'id': 'a0001',
          'image_url': 'https://m.media-amazon.com/images/I/51d1qVhmAmL._AC_UL436_.jpg',
          'title': 'Product title',
          'price': '$9,99'
        },
        {
          'id': 'a0002',
          'image_url': 'https://m.media-amazon.com/images/I/51J+Z3wDJkL._AC_UL436_.jpg',
          'title': 'Product title #1',
          'price': '$1,11'
        }
      ]
    });
  }

  render() {
    let { isLoading, products } = this.state;

    if (isLoading) return <Load />;

    return (
      <Grid container spacing={24}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductItem data={product} />
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default Home;
