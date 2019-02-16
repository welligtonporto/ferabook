import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { setCountProductsOnCart } from "./../product_item/_actionsReducers";

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import Load from './../load/Load'

import './ShoppingCart.scss';

class ShoppingCart extends Component {
  state = {
    gettingOrder: false,
    isLoading: true,
    productsOnCart: [],
    totalPrices: {
      cart: null,
      items: []
    }
  };

  componentDidMount() {
    this.getProductsOnCart();
  };

  getProductsOnCart = () => {
    let productsOnCart = JSON.parse(localStorage.getItem('productsOnCart')) || [];

    if (Object.keys(productsOnCart).length){
      this.setState({
        isLoading: false,
        productsOnCart,
        totalPrices: this.getTotalPrices(productsOnCart)
      });
    } else {
      this.setState({
        isLoading: false,
        productsOnCart: []
      });
    }
  };

  getTotalPrices = (productsOnCart) => {
    const defaultPrice = '10.00';

    let totalPricesByItem = productsOnCart.map(product => (
      (product.saleInfo ? product.saleInfo.listPrice.amount : defaultPrice) * product.qty).toFixed(2)
    );

    let totalPricesCart = totalPricesByItem.reduce((sum, totalItem) => parseFloat(sum) + parseFloat(totalItem), 0);

    return {
      items: totalPricesByItem,
      cart: totalPricesCart
    }
  };

  getOrder = () => {
    // TODO: Mudar isso para api
    this.setState({
      gettingOrder: true
    });

    setTimeout(() => {
      this.setState({
        gettingOrder: false
      });

      this.props.history.push('/order-completed');
    }, 2000);
  }

  removeProductFromCart = (indexProduct) => {
    let productsOnCart = JSON.parse(localStorage.getItem('productsOnCart')) || [];
    productsOnCart.splice(indexProduct, 1);
    localStorage.setItem('productsOnCart', JSON.stringify(productsOnCart));
  
    this.getProductsOnCart();
    this.refreshCountItemsOnCart(productsOnCart);
  };
  
  refreshCountItemsOnCart = productsOnCart => {
    let newCountItemsOnCart = productsOnCart.reduce((sum, product) => sum + product.qty, 0);
    this.props.setCountProductsOnCart(newCountItemsOnCart);
  };

  render() {
    let { gettingOrder, isLoading, productsOnCart, totalPrices } = this.state;
    const defaultPrice = '10.00';

    return (
      <div>
        <Typography variant="h4" color="primary" gutterBottom>
          Shopping Cart
        </Typography>

        {isLoading && (
          <Load />
        )}

        {!isLoading && (
          <React.Fragment>
            {!productsOnCart.length && (
              <React.Fragment>
                <Typography component="p" gutterBottom>
                  The Shopping Cart is empty.
                </Typography>

                <Button variant="contained" size="medium" color="secondary" onClick={() => this.props.history.push('/')}>
                  Start shopping now
                </Button>
              </React.Fragment>
            )}

            {productsOnCart.length > 0 && (
              <React.Fragment>
                <Paper>
                  <Table>
                    <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell align="center">Qty.</TableCell>
                          <TableCell align="center">@</TableCell>
                          <TableCell align="center">Price</TableCell>
                          <TableCell />
                        </TableRow>
                      </TableHead>
                    <TableBody>
                      {productsOnCart.map((product, index) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="shoppingCart__tableCellPrimary">
                              <img width="70" src={product.volumeInfo.imageLinks.thumbnail} alt={product.title} />

                              <strong>
                                {product.volumeInfo.title}
                              </strong>
                            </div>
                          </TableCell>

                          <TableCell align="center">{product.qty}</TableCell>

                          <TableCell align="center">{`$ ${product.saleInfo ? product.saleInfo.listPrice.amount : defaultPrice}`}</TableCell>

                          <TableCell align="center">{`$ ${totalPrices.items[index]}`}</TableCell>

                          <TableCell align="center">
                            <IconButton fontSize="large" onClick={this.removeProductFromCart.bind(this, index)}>
                              <DeleteIcon  color="inherit"  variant="raised" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}

                      <TableRow>
                        <TableCell colSpan={2} />

                        <TableCell align="center">
                          <strong>
                            Total:
                          </strong>
                        </TableCell>

                        <TableCell align="center">
                          <Typography color="secondary">
                            {`$ ${totalPrices.cart}`}
                          </Typography>
                        </TableCell>

                        <TableCell />
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>

                <div className="shoppingCart__actions">
                  <Button size="medium" color="secondary" onClick={() => this.props.history.push('/')}>
                    <KeyboardArrowLeftIcon />
                    Continue shopping
                  </Button>

                  <Button variant="contained" size="medium" color="secondary" onClick={this.getOrder} disabled={gettingOrder}>
                    Place order
                    {gettingOrder && <CircularProgress color="secondary" className="shoppingCart__gettingOrder" size={20} />}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCountProductsOnCart
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(ShoppingCart);