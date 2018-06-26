import React, { Component } from 'react';
import 'babel-register';
import 'react-table/react-table.css';
import 'react-rangeslider/lib/index.css';
import '../node_modules/react-select/dist/react-select.css';
import './App.css';
import BagSetup from './containers/bagSetup/bagSetup';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BagSetup companies={null} />
      </div>
    );
  }
}

export default App;
