import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers/rootReducer';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = composeWithDevTools(
  applyMiddleware(thunk),
  applyMiddleware(sagaMiddleware),
)(createStore);

export default function configureStore() {
  const store = createStoreWithMiddleware(rootReducer);
  sagaMiddleware.run(rootSaga);
  return store;
}
