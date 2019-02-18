import React, { Component } from 'react';
import { connect } from "react-redux";

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Chip from '@material-ui/core/Chip';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CheckIcon from '@material-ui/icons/Check';

import Load from './../load/Load'

import firebase from './../../firebaseClient.js';

import './UserOrders.scss';

class UserOrders extends Component {
  state = {
    hasPermission: false,
    isLoading: false,
    userOrders: {}
  };

  componentDidMount = () => {
    if (this.props.user){
      this.listenerUserOrders();
    };
  };

  componentDidUpdate = (prevProps) => {
    if ((prevProps.user !== this.props.user) && this.props.user){
      this.listenerUserOrders();
    }
  };

  listenerUserOrders = () => {
    firebase.database().ref(`user_orders/${this.props.user.uid}`).on('value', (snapshot) => {
      this.setState({
        userOrders: snapshot.val() ? snapshot.val() : {}
      });
    });
  };

  render() {
    let hasPermission = this.props.user ? true : false;
    let { userOrders, isLoading } = this.state;

    if (!hasPermission) return (
      <div>You don't have permisson.</div>
    )

    return (
      <div className="userOrders">
        <Typography variant="h4" color="primary" gutterBottom>
          My Orders
        </Typography>

        {isLoading && (
          <Load />
        )}

        {!isLoading && (
          <React.Fragment>
            {!Object.keys(userOrders).length && (
              <React.Fragment>
                <Typography component="p" gutterBottom>
                  You didn't make any order.
                </Typography>

                <Button variant="contained" size="medium" color="secondary" onClick={() => this.props.history.push('/')}>
                  Start shopping now
                </Button>
              </React.Fragment>
            )}

            {Object.keys(userOrders).length > 0 && (
              <Paper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Order code</TableCell>
                      <TableCell>Made in</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {Object.keys(userOrders).reverse().map((key, index) => (
                      <TableRow key={index}>
                        <TableCell>{userOrders[key].orderId}</TableCell>
                        <TableCell>{userOrders[key].date}</TableCell>
                        <TableCell>{`$ ${userOrders[key].price}`}</TableCell>
                        <TableCell>
                          {userOrders[key].status === "review" && (
                            <Chip icon={<AccessTimeIcon />} label="In review" />
                          )}

                          {userOrders[key].status === "approved" && (
                            <Chip icon={<CheckIcon />} label="Approved" variant="default" color="secondary" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            )}
          </React.Fragment>
        )}
      </div>
    )
  }
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  null
)(UserOrders);
