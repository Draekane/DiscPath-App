import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import disc from '../reducers/disc';
import company from '../reducers/company';

const discPath = combineReducers({
  disc,
  company,
  form: formReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined; // eslint-disable-line no-param-reassign
  }

  return discPath(state, action);
};

export default rootReducer;
