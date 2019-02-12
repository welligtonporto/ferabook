import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import './Load.scss';

const Load = ({ data: productData }) => {
  return <div className="load"><CircularProgress /></div>;
};

export default Load;

