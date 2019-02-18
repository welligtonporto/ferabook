import React from 'react';
import { Route } from 'react-router-dom';

import AdminLayoutHeader from './AdminLayoutHeader'

import './AdminLayout.scss';

const AdminLayout = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <div className="adminLayout">
        <AdminLayoutHeader {...matchProps} />
        
        <div className="adminLayout__content">
          <Component {...matchProps} />
        </div>
      </div>  
    )} />
  )
};

export default AdminLayout;