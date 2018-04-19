import * as bagActionTypes from '../actionTypes/bag';

const intiialState = {
  discs: [],
};

const disc = (state = intiialState, action = {}) => {
  switch (action.type) {
    case bagActionTypes.ADD_DISC_TO_BAG:
      if (action.disc === null) return state;
      return {...state, discs: [ ...state.discs, {...action.disc, baggedDiscId: state.discs.length+1 } ]};
    case bagActionTypes.UPDATE_DISC_WEAR:
    return {...state, discs: state.discs.map((disc) => {
      if (disc.baggedDiscId === action.baggedDiscId) return {...disc, wear: action.wear };
      else return disc;
    }) } ;
    case bagActionTypes.DISABLE_DISC:
    case bagActionTypes.ENABLE_DISC:
      return {...state, discs: state.discs.map((disc) => {
        if (disc.baggedDiscId === action.baggedDiscId) return {...disc, enabled: action.enabled };
        else return disc;
      }) } ;
    default:
      return state;
  }
};

export default disc;
