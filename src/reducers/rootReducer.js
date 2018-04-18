import { combineReducers } from 'redux';

import bag from './bag';
import company from './company';

const rootReducer = combineReducers({
  bag,
  company,
});

export default rootReducer;
