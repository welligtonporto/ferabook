import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
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
    totalPrice: null
  };

  componentDidMount() {
    this.getProductsOnCart();
  };

  getProductsOnCart = () => {
    // TODO: Mudar para API
    this.setState({
      isLoading: false,
      productsOnCart: [
        {
          'id': 'a0001',
          'image_url': 'https://m.media-amazon.com/images/I/51d1qVhmAmL._AC_UL436_.jpg',
          'title': 'Product title',
          'price': '9,99'
        },
        {
          'id': 'a0002',
          'image_url': 'https://m.media-amazon.com/images/I/51J+Z3wDJkL._AC_UL436_.jpg',
          'title': 'Product title #1',
          'price': '1,11'
        }
      ],
      totalPrice: this.calcTotalPrice([
        {
          'id': 'a0001',
          'image_url': 'https://m.media-amazon.com/images/I/51d1qVhmAmL._AC_UL436_.jpg',
          'title': 'Product title',
          'price': '3.2'
        },
        {
          'id': 'a0002',
          'image_url': 'https://m.media-amazon.com/images/I/51J+Z3wDJkL._AC_UL436_.jpg',
          'title': 'Product title #1',
          'price': '2.2'
        },
        {
          'id': 'a0002',
          'image_url': 'https://m.media-amazon.com/images/I/51J+Z3wDJkL._AC_UL436_.jpg',
          'title': 'Product title #1',
          'price': '1.2'
        }
      ])
    });
  };

  calcTotalPrice = (productsOnCart) => {
    let totalPrice = 0;

    productsOnCart.map(product => totalPrice = parseFloat(totalPrice) + parseFloat(product.price));

    return totalPrice.toFixed(2);
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

  render() {
    let { gettingOrder, isLoading, productsOnCart } = this.state;

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

            {productsOnCart.length && (
              <React.Fragment>
                <Paper>
                  <Table>
                    <TableBody>
                      {productsOnCart.map(product => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="shoppingCart__tableCellPrimary">
                              <img width="70" src={product.image_url} alt={product.title} />

                              <strong>
                                {product.title}
                              </strong>
                            </div>
                          </TableCell>

                          <TableCell align="center">{product.price}</TableCell>

                          <TableCell align="center">
                            <IconButton fontSize="large" onClick={() => console.log('remove to cart')}>
                              <DeleteIcon  color="inherit"  variant="raised" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}

                      <TableRow>
                        <TableCell align="right">
                          <strong>
                            Total:
                          </strong>
                        </TableCell>

                        <TableCell align="center">
                          <Typography color="secondary">
                            {`$ ${this.state.totalPrice}`}
                          </Typography>
                        </TableCell>

                        <TableCell align="center"/>
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

export default ShoppingCart;
