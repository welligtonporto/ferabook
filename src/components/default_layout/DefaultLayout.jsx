import React from 'react';
import { Route } from 'react-router-dom';

import DefaultLayoutHeader from './DefaultLayoutHeader'

import './DefaultLayout.scss';

const DefaultLayout = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <div className="defaultLayout">
        <DefaultLayoutHeader {...matchProps} />
        
        <div className="defaultLayout__content">
          <Component {...matchProps} />
        </div>
      </div>  
    )} />
  )
};


export default DefaultLayout;