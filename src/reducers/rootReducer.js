import { combineReducers } from 'redux';

import bag from './bag';
import company from './company';
import menus from './menus';

const rootReducer = combineReducers({
  bag,
  company,
  menus,
});

export default rootReducer;
