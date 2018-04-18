import * as bagActionTypes from '../actionTypes/bag';

const intiialState = {
  discs: [],
};

const disc = (state = intiialState, action = {}) => {
  switch (action.type) {
    case bagActionTypes.ADD_DISC_TO_BAG:
      if (action.disc === null) return state;
      return {...state, discs: [ ...state.discs, action.disc ]};
    case bagActionTypes.UPDATE_DISC_WEAR:
      return state;
    case bagActionTypes.DISABLE_DISC:
      return state;
    case bagActionTypes.ENABLE_DISC:
      return state;
    default:
      return state;
  }
};

export default disc;
