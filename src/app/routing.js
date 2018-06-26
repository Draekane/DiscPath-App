import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import _ from 'lodash';

import { routes } from './routes';

const Routing = () => _.map(routes, route => (
  <Route key={route.path} exact path={route.path} component={route.component} />));

const mapStateToProps = state => ({
  dispatch: state.dispatch,
});

Routing.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Routing);
