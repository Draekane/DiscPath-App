import React, { Component } from 'react';
import 'babel-register';
import './App.css';
import SinglePane from './components/layout/singlePane';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SinglePane companies={null} />
      </div>
    );
  }
}

export default App;
