// import PropTypes from 'prop-types';
import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import 'babel-register';
import 'react-table/react-table.css';
import 'react-rangeslider/lib/index.css';
import '../node_modules/react-select/dist/react-select.css';
import './App.css';

import Routing from './app/routing';

const App = () => {
  const dataReactRootProperty = { 'data-reactroot': '' };
  return (
    <ConnectedRouter>
      <div {...dataReactRootProperty} >
        <Switch>
          <Routing />
        </Switch>
      </div>
    </ConnectedRouter>
  );
};

// App.PropTypes = {

// };

export default hot(module)(App);
