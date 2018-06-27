import * as similarDiscActionTypes from '../actionTypes/similarDisc';

const initialState = {
  similarity: 0.1,
};

const thrower = (state = initialState, action = {}) => {
  let newState;

  switch (action.type) {
    case similarDiscActionTypes.SIMILARITY_CHANGE:
      newState = {
        ...state,
        similarity: action.similarity,
      };
      break;
    default:
      newState = state;
      break;
  }

  return newState;
};

export default thrower;
