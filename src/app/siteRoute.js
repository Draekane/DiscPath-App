import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const SiteRoute = ({ component: WrappedComponent, ...rest }) => (
  <Route
    {...rest}
    render={
        props => (
          <WrappedComponent {...props} />
        )}
  />
);

SiteRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default SiteRoute;
