import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { setUserAdmin, clearUserAdmin } from "./../admin_login/_actionsReducers";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import firebaseAdmin from './../../firebaseAdmin.js';
import { logout } from './../../models/CheckinModelAdmin';

class AdminLayoutHeader extends Component {
  componentDidMount() {
    this.authListener();
  };

  authListener = () => {
    firebaseAdmin.auth().onAuthStateChanged((user) => {
      if (user){
        this.props.setUserAdmin(user);
      } else {
        this.props.clearUserAdmin();
      }
    });
  };

  onLogout = () => {
    logout().then(() => {
      this.props.clearUserAdmin();
      this.props.history.push('/admin');
    });
  };

  render() {
    return (
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className="logo">
            <span onClick={() => this.props.history.push('/admin/orders')}>
              #ferabook
            </span>
          </Typography>

          {this.props.userAdmin && (
            <Button color="inherit" onClick={this.onLogout.bind(this)}>
              <ExitToAppIcon className="personIcon" />
              <Typography color="inherit">
                Logout
              </Typography>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  userAdmin: state.userAdmin
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUserAdmin,
      clearUserAdmin
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminLayoutHeader);