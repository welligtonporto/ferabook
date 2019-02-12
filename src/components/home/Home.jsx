import React, { Component } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import ProductItem from './../product_item/ProductItem'

import './Home.scss';

class Home extends Component {
  state = {
    isLoading: true,
    products: {}
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
        },
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
        },
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
        },
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
        },
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
        },
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

  componentDidMount() {
    this.getProducts();
  };

  render() {
    let { isLoading, products } = this.state;

    if (isLoading) return <div className="load"><CircularProgress /></div>;

    return (
      <div className="container">
        <Grid container spacing={24}>
          {products.map(product => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductItem data={product} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default Home;
