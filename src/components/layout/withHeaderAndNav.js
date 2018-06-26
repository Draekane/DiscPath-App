/* eslint-disable react/prefer-stateless-function */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Header from './header';
import Sidebar from './sidebar';

const WithHeaderAndNav = (WrappedComponent) => {
  const WithHeaderAndNavContainer = (props) => {
    const {
      dispatch,
    } = props;

    return (
      <div id="root">
        <div id="DiscPath">
          <Header
            dispatch={dispatch}
          />
          <div className="lower">
            <Sidebar />
            <section className="main-container">
              <WrappedComponent {...props} />
            </section>
          </div>
        </div>
      </div>
    );
  };
  WithHeaderAndNavContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  function select(state) {
    return {
      dispatch: state.dispatch,
    };
  }

  return connect(select)(WithHeaderAndNavContainer);
};

export default WithHeaderAndNav;
