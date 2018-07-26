import * as displayOptionActionTypes from '../actionTypes/displayOptions';

const initialState = {
  fanPower: true,
  pathsShown: 'one',
  lieDistance: true,
  lieCircle: true,
};

const displayOptions = (state = initialState, action = {}) => {
  let newState;
  switch (action.type) {
    case displayOptionActionTypes.CHANGE_LIE_DISTANCE:
      newState = {
        ...state,
        lieDistance: (!state.lieDistance),
      };
      break;
    case displayOptionActionTypes.CHANGE_LIE_CIRCLE:
      newState = {
        ...state,
        lieCircle: (!state.lieCircle),
      };
      break;
    case displayOptionActionTypes.CHANGE_FAN_POWER:
      newState = {
        ...state,
        fanPower: (!state.fanPower),
      };
      break;
    case displayOptionActionTypes.CHANGE_PATHS:
      newState = {
        ...state,
        pathsShown: action.paths,
      };
      break;
    default:
      newState = state;
  }

  return newState;
};

export default displayOptions;
