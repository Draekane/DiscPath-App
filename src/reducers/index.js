import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import disc from '../reducers/disc';
import company from '../reducers/company';

const rootReducer = combineReducers({
  disc,
  company,
  form: formReducer,
});

export default rootReducer;
