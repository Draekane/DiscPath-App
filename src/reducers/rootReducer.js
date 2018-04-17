import { combineReducers } from 'redux';

import disc from './disc';
import company from './company';

const rootReducer = combineReducers({
  disc,
  company,
});

export default rootReducer;
