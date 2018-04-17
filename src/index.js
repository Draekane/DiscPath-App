import React from 'react';
import thunkMiddleWare from 'redux-thunk';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducer);

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
// registerServiceWorker();
