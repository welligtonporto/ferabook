import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class OrderCompleted extends Component {
  render() {
    return (
      <div>
        <Typography variant="h4" color="primary" gutterBottom>
          Order Completed!
        </Typography>

        <Typography component="p" gutterBottom>
          Track the your order status going to 

          <Button variant="contained" size="small" color="primary" onClick={() => this.props.history.push('/my-orders')} style={{ marginLeft: 5 }}>
            My orders
          </Button>

          .
        </Typography>

        <Button variant="contained" size="medium" color="secondary" onClick={() => this.props.history.push('/')}>
          Go to home page
        </Button>

        
      </div>
    );
  }
}

export default OrderCompleted;
