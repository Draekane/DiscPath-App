import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import persistState from 'redux-localstorage';

import rootReducer from '../reducers/rootReducer';

export default function configureStore() {
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk),
    // persistState('bag.bags'),
  );
}
