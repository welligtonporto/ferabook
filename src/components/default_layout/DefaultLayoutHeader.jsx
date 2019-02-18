import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { setCountProductsOnCart } from "./../product_item/_actionsReducers";
import { showCheckin, setUser, clearUser } from "./../checkin/_actionsReducers";

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

import firebase from './../../firebaseClient.js';
import { userLogout } from './../../models/CheckinModel';

import './DefaultLayoutHeader.scss';

class DefaultLayoutHeader extends Component {
  state = {
    anchorAccountMenu: null,
  };

  componentDidMount = () => {
    this.setCountProductsOnCart();
    this.authListener();
  };

  authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        this.props.setUser(user);
      } else {
        this.props.clearUser();
      }
    });
  };

  setCountProductsOnCart = () => {
    let productsOnCart = JSON.parse(localStorage.getItem('productsOnCart')) || [];

    if (Object.keys(productsOnCart).length){
      let quantityOnCart = Object.keys(productsOnCart).reduce((sum, key) => sum + productsOnCart[key].qty, 0);

      this.props.setCountProductsOnCart(quantityOnCart);
    }
  };

  handleOpenAccountMenu = event => {
    this.setState({ anchorAccountMenu: event.currentTarget });
  };

  handleCloseAccountMenu = () => {
    this.setState({ anchorAccountMenu: null });
  };

  getLogout = () => {
    userLogout().then(() => this.props.clearUser());
  };

  render() {
    const { anchorAccountMenu } = this.state;
    const openAccountMenu = Boolean(anchorAccountMenu);

    return (
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className="logo">
            <span onClick={() => this.props.history.push('/')}>
              #ferabook
            </span>
          </Typography>

          {this.props.user && (
            <React.Fragment>
              <Button color="inherit" aria-owns={openAccountMenu ? 'menu-appbar' : undefined} aria-haspopup="true" onClick={this.handleOpenAccountMenu.bind(this)}>
                <PersonIcon className="personIcon" />

                <Typography color="inherit">
                  Hi, <strong>{this.props.user.email}</strong>
                </Typography>

                <ArrowDropDownIcon />
              </Button>

              <Menu
                id="menu-appbar"
                anchorEl={anchorAccountMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openAccountMenu}
                onClose={this.handleCloseAccountMenu}
              >
                <MenuItem onClick={() => this.props.history.push('my-orders')}>My orders</MenuItem>
                <MenuItem onClick={this.getLogout.bind(this)}>Logout</MenuItem>
              </Menu>
            </React.Fragment>
          )}

          {!this.props.user && (
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
  countProductsOnCart: state.countProductsOnCart,
  user: state.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCountProductsOnCart,
      showCheckin,
      setUser,
      clearUser
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayoutHeader);