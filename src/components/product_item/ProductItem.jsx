import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import './ProductItem.scss';

const ProductItem = ({ data: productData }) => {
  return (
    <Card>
      <img className="productItem__img" src={productData.image_url} alt={productData.title} />

      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {productData.title}
        </Typography>
        <Typography component="p">
          {productData.price}
        </Typography>
      </CardContent>

      <CardActions>
        <Button variant="contained" size="medium" color="secondary" fullWidth>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  )
};

export default ProductItem;