/* eslint-disable react/prefer-stateless-function */

import PropTypes from 'prop-types';

import React from 'react';

import Header from './header';
import Sidebar from './sidebar';

const MainPage = (WrappedComponent) => {
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

  return WithHeaderAndNavContainer;
};

export default MainPage;
