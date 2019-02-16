import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { setCountProductsOnCart } from "./../product_item/_actionsReducers";
import { showCheckin } from "./../checkin/_actionsReducers";

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
    auth: false,
    anchorEl: null,
  };

  componentDidMount() {
    this.setCountProductsOnCart();
  }

  setCountProductsOnCart = () => {
    let productsOnCart = JSON.parse(localStorage.getItem('productsOnCart')) || [];

    if (Object.keys(productsOnCart).length){
      let quantityOnCart = Object.keys(productsOnCart).reduce((sum, key) => sum + productsOnCart[key].qty, 0);

      this.props.setCountProductsOnCart(quantityOnCart);
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
            <Button color="inherit" onClick={this.props.showCheckin.bind(this)}>
              <PersonIcon className="personIcon" />
              <Typography color="inherit">
                Login/Signup
              </Typography>
            </Button>
          )}

          <IconButton color="inherit" onClick={() => this.props.history.push('/cart')}>
            <Badge badgeContent={this.props.countProductsOnCart} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  countProductsOnCart: state.countProductsOnCart
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCountProductsOnCart,
      showCheckin
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayoutHeader);