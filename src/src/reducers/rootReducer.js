import { combineReducers } from 'redux';

import bagArray from './bagArray';
import company from './company';
import menus from './menus';
import displayOptions from './displayOptions';
import similarDisc from './similarDiscs';
import thrower from './thrower';

const rootReducer = combineReducers({
  bag: bagArray,
  company,
  displayOptions,
  menus,
  similarDisc,
  thrower,
});

export default rootReducer;
