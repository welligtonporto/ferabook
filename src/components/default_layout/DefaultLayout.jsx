import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from "react-redux";

import Checkin from './../checkin/Checkin'

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

        <Checkin open={rest.checkinIsVisible} />
      </div>  
    )} />
  )
};

const mapStateToProps = state => ({
  checkinIsVisible: state.checkinIsVisible
});

export default connect(
  mapStateToProps,
  null
)(DefaultLayout);