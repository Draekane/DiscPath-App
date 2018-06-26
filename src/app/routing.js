import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import SiteRoute from './siteRoute';
import { routes } from './routes';

const Routing = () => _.map(routes, route => (
  <SiteRoute key={route.path} exact path={route.path} component={route.component} />));

Routing.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    dispatch: state.dispatch,
  };
}

export default connect(mapStateToProps)(Routing);
