import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { hideCheckin, setUser } from "./../checkin/_actionsReducers";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import { userSignup, userLogin } from './../../models/CheckinModel';

import './Checkin.scss';

class Checkin extends Component {
  state = {
    isLogging: false,
    isSigning: false,
    loginEmail: '',
    loginPassword: '',
    messageAlertLoginFailed: '',
    messageAlertSignUpFailed: '',
    signupEmail: '',
    signupPassword: ''
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  onLogin = () => {
    this.setState({
      isLogging: true,
      messageAlertLoginFailed: ''
    });
    
    userLogin(this.state.loginEmail, this.state.loginPassword)
      .then((response) => {
        this.setState({
          isLogging: false
        });

        this.props.setUser(response.user);
        this.props.hideCheckin();
      })
      .catch(error => {
        this.setState({
          isLogging: false,
          messageAlertLoginFailed: error.message
        });
      });
  };

  onSignup = () => {
    this.setState({
      isSigning: true,
      messageAlertSignUpFailed: ''
    });

    userSignup(this.state.signupEmail, this.state.signupPassword)
      .then(() => {
        this.setState({
          isSigning: false
        });

        this.props.hideCheckin();
      })
      .catch(error => {
        this.setState({
          isSigning: false,
          messageAlertSignUpFailed: error.message
        });
      });
  };

  render() {
    let {
      isLogging,
      isSigning,
      messageAlertLoginFailed,
      messageAlertSignUpFailed
    } = this.state;

    return (
      <Dialog
        open={this.props.checkinIsVisible}
        onClose={this.props.hideCheckin.bind(this)}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogContent>
          <div className="checkin__global">
            <Grid container spacing={24} alignItems="stretch" justify="space-around">
              <Grid item xs={12} md={5}>
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

              <Grid item xs={12} md={5}>
                <Typography variant="h4" color="primary" gutterBottom>
                  Signup
                </Typography>
                
                {messageAlertSignUpFailed &&
                  <SnackbarContent
                    message={messageAlertSignUpFailed}
                  />
                }

                <TextField
                  margin="normal"
                  label="Email"
                  type="email"
                  fullWidth
                  onChange={this.handleChange('signupEmail')}
                />

                <TextField
                  margin="normal"
                  label="Password"
                  type="password"
                  fullWidth
                  onChange={this.handleChange('signupPassword')}
                />

                <Button variant="contained" size="medium" color="secondary" onClick={this.onSignup.bind(this)} fullWidth disabled={isSigning}>
                  Signup

                  {isSigning && <CircularProgress color="secondary" className="shoppingCart__gettingOrder" size={20} />}
                </Button>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  checkinIsVisible: state.checkinIsVisible
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hideCheckin,
      setUser
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkin);

