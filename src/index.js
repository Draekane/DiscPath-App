import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/index';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducer, window.STATE_FROM_SERVER);

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
