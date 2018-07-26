import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import 'babel-register';
import 'react-table/react-table.css';
import 'react-rangeslider/lib/index.css';

import Routing from './app/routing';

const App = () => {
  const dataReactRootProperty = { 'data-reactroot': '' };

  return (
    <Router>
      <div {...dataReactRootProperty} >
        <Switch>
          <Redirect exact from="/" to="/bagSetup" />
          <Routing />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
