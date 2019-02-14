import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { addProductOnCart } from "./../product_item/_actionsReducers";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import './DefaultLayoutHeader.scss';

class DefaultLayoutHeader extends Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  componentDidMount() {
    this.setProductsOnCart();
  }

  setProductsOnCart = () => {
    let productsOnCart = JSON.parse(localStorage.getItem('productsOnCart')) || {};

    if (Object.keys(productsOnCart).length){
      let quantityOnCart = Object.keys(productsOnCart).reduce((sum, key) => sum + productsOnCart[key], 0);
      this.props.addProductOnCart(quantityOnCart);
    }
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className="logo">
            <span onClick={() => this.props.history.push('/')}>
              #ferabook
            </span>
          </Typography>

          {auth && (
            <React.Fragment>
              <Button color="inherit" aria-owns={open ? 'menu-appbar' : undefined} aria-haspopup="true" onClick={this.handleMenu}>
                <PersonIcon className="personIcon" />

                <Typography color="inherit">
                  Hi, <strong>Welligton</strong>
                </Typography>

                <ArrowDropDownIcon />
              </Button>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={() => console.log('click my orders')}>My orders</MenuItem>
                <MenuItem onClick={() => this.setState({ auth: false })}>Logout</MenuItem>
              </Menu>
            </React.Fragment>
          )}

          {!auth && (
            <Button color="inherit" onClick={() => console.log('open modal')}>
              <PersonIcon className="personIcon" />
              <Typography color="inherit">
                Login/Signup
              </Typography>
            </Button>
          )}

          <IconButton color="inherit" onClick={() => this.props.history.push('/cart')}>
            <Badge badgeContent={this.props.productsOnCart} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  productsOnCart: state.productsOnCart
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addProductOnCart
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayoutHeader);