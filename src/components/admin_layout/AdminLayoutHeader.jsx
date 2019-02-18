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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import firebase from './../../firebase.js';
import { logout } from './../../models/CheckinModel';

// import './DefaultLayoutHeader.scss';

class AdminLayoutHeader extends Component {
  state = {
    // anchorEl: null,
  };

  componentDidMount() {
    // this.authListener();
  };

  // authListener = () => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user){
  //       this.props.setUser(user);
  //     } else {
  //       this.props.clearUser();
  //     }
  //   });
  // };

  // handleMenu = event => {
  //   this.setState({ anchorEl: event.currentTarget });
  // };

  // handleClose = () => {
  //   this.setState({ anchorEl: null });
  // };

  onLogout = () => {
    console.log('onLogout');
    // logout().then(() => this.props.clearUser());
  };

  render() {
    // const { anchorEl } = this.state;
    // const open = Boolean(anchorEl);

    return (
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className="logo">
            <span onClick={() => this.props.history.push('/admin/orders')}>
              #ferabook
            </span>
          </Typography>

          <Button color="inherit" onClick={this.onLogout.bind(this)}>
            <ExitToAppIcon className="personIcon" />
            <Typography color="inherit">
              Logout
            </Typography>
          </Button>
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
)(AdminLayoutHeader);