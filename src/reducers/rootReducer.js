import { combineReducers } from 'redux';

import bag from './bag';
import company from './company';
import menus from './menus';
import displayOptions from './displayOptions';
import thrower from './thrower';

const rootReducer = combineReducers({
  bag,
  company,
  displayOptions,
  menus,
  thrower,
});

export default rootReducer;
