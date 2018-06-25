import * as throwerActionTypes from '../actionTypes/thrower';

const initialState = {
  throwType: 'rhbh',
  power: 32,
};

const thrower = (state = initialState, action = {}) => {
  let newState;

  switch (action.type) {
    case throwerActionTypes.CHANGE_THROWER_TYPE:
      newState = {
        ...state,
        throwType: action.throwerType,
      };
      break;
    case throwerActionTypes.CHANGE_THROWER_POWER:
      newState = {
        ...state,
        power: action.throwerPower,
      };
      break;
    default:
      newState = state;
      break;
  }

  return newState;
};

export default thrower;
