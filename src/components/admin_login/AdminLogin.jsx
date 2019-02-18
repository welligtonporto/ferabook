import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { setUserAdmin } from "./_actionsReducers";

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import { adminLogin } from './../../models/CheckinModel';

class AdminLogin extends Component {
  state = {
    isLogging: false,
    loginEmail: '',
    loginPassword: '',
    messageAlertLoginFailed: ''
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  onLogin = () => {
    this.setState({
      isLogging: true,
      messageAlertLoginFailed: ''
    });

    adminLogin(this.state.loginEmail, this.state.loginPassword)
      .then((response) => {
        this.setState({
          isLogging: false
        });

        this.props.setUserAdmin(response.user);
        this.props.history.push('/admin/orders');
      })
      .catch(error => {
        this.setState({
          isLogging: false,
          messageAlertLoginFailed: error.message
        });
      });
  };

  render() {
    let { isLogging, messageAlertLoginFailed } = this.state;

    return (
      <div>
        <Grid container spacing={24} alignItems="stretch" justify="space-around">
          <Grid item xs={12} sm={8} md={5} lg={4}>
            <Typography variant="h4" color="primary" gutterBottom>
              Login
            </Typography>

            {messageAlertLoginFailed &&
              <SnackbarContent
                message={messageAlertLoginFailed}
              />
            }

            <TextField
              margin="normal"
              label="Email"
              type="email"
              fullWidth
              onChange={this.handleChange('loginEmail')}
            />

            <TextField
              margin="normal"
              label="Password"
              type="password"
              fullWidth
              onChange={this.handleChange('loginPassword')}
            />

            <Button variant="contained" size="medium" color="primary" onClick={this.onLogin.bind(this)} fullWidth disabled={isLogging}>
              Login

              {isLogging && <CircularProgress color="secondary" className="shoppingCart__gettingOrder" size={20} />}
            </Button>
          </Grid>
        </Grid>  
      </div>
    )
  }
};

const mapStateToProps = state => ({
  userAdmin: state.userAdmin
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUserAdmin
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminLogin);
