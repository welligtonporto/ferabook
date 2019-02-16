import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { incrementCountProductsOnCart } from "./_actionsReducers";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import './ProductItem.scss';

class ProductItem extends Component {
  addToCart = (productData) => {
    let oldProductsOnCart = JSON.parse(localStorage.getItem('productsOnCart')) || [];
    let productAlreadyAdded = oldProductsOnCart.find(item => item.id === productData.id);

    if (productAlreadyAdded) {
      let indexProduct = oldProductsOnCart.indexOf(productAlreadyAdded);
      oldProductsOnCart[indexProduct].qty++;
    } else {
      oldProductsOnCart.push({
        ...productData,
        qty: 1
      });
    }

    localStorage.setItem('productsOnCart', JSON.stringify(oldProductsOnCart));
    this.props.incrementCountProductsOnCart(1);
  };

  render() {
    const defaultPrice = '10.00';
    const productData = this.props.data;

    return (
      <Card className="productItem">
        <img className="productItem__img" src={productData.volumeInfo.imageLinks.thumbnail} alt={productData.volumeInfo.title} />

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {productData.volumeInfo.title}
          </Typography>
          <Typography component="p">
            {`$ ${productData.saleInfo ? productData.saleInfo.listPrice.amount : defaultPrice}`}
          </Typography>
        </CardContent>

        <CardActions className="productItem__actions">
          <Button variant="contained" size="medium" color="secondary" fullWidth onClick={this.addToCart.bind(this, productData)}>
            Add to cart
          </Button>
        </CardActions>
      </Card>
    )
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      incrementCountProductsOnCart
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(ProductItem);
