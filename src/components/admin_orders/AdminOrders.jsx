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

import { getOrders, updateOrder } from './../../models/OrderModel.js';

import firebase from './../../firebase.js';

import './AdminOrders.scss';

class AdminOrders extends Component {
  state = {
    isLoading: false,
    orders: {}
  };

  componentDidMount(){
    this.listenerOrders();
  };

  componentDidUpdate(prevProps){
    // if ((prevProps.user !== this.props.user) && this.props.user){
      // this.getOrders();
    // }
  };

  // getOrders = async () => {
  //   this.setState({
  //     isLoading: true
  //   });

  //   try {
  //     let response = await getOrders();

      
  //   } catch {
  //     console.log('catch');

  //     this.setState({
  //       isLoading: false
  //     });
  //   }
  // };

  listenerOrders = () => {
    firebase.database().ref('orders').on('value', (snapshot) => {
      this.setState({
        orders: snapshot.val()
      });
    });
  };

  onChangeStatusOrder = (orderKey, orderData) => {
    orderData.status = 'approved';
    
    updateOrder(orderKey, orderData);
  };

  render() {
    // let hasPermission = this.props.user ? true : false;
    let hasPermission = true;
    let { orders, isLoading } = this.state;

    if (!hasPermission) return (
      <div>You don't have permisson.</div>
    )

    return (
      <div className="adminOrders">
        <Typography variant="h4" color="primary" gutterBottom>
          Orders
        </Typography>

        {isLoading && (
          <Load />
        )}

        {!isLoading && (
          <React.Fragment>
            {!Object.keys(orders).length && (
              <React.Fragment>
                <Typography component="p" gutterBottom>
                  You didn't make any order.
                </Typography>
              </React.Fragment>
            )}

            {Object.keys(orders).length > 0 && (
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
                    {Object.keys(orders).reverse().map((key, index) => (
                      <TableRow key={index}>
                        <TableCell>{orders[key].orderId}</TableCell>
                        <TableCell>{orders[key].date}</TableCell>
                        <TableCell>{`$ ${orders[key].price}`}</TableCell>
                        <TableCell>
                          {orders[key].status === "review" && (
                            <React.Fragment>
                              <Chip icon={<AccessTimeIcon />} label="In review" />

                              <Button color="primary" onClick={this.onChangeStatusOrder.bind(this, key, orders[key])}>
                                <CheckIcon />
                                Approve order
                              </Button>
                            </React.Fragment>
                          )}

                          {orders[key].status === "approved" && (
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

export default AdminOrders;
