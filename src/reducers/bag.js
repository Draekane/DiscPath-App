import _ from 'lodash';
import * as bagActionTypes from '../actionTypes/bag';

const intiialState = {
  discs: [],
  lastDiscId: 0,
};

const disc = (state = intiialState, action = {}) => {
  switch (action.type) {
    case bagActionTypes.ADD_DISC_TO_BAG:
      if (action.disc === null) return state;
      return {
        ...state,
        discs: [
          ...state.discs, {
            ...action.disc,
            baggedDiscId: state.lastDiscId + 1,
          },
        ],
        lastDiscId: state.lastDiscId + 1,
      };
    case bagActionTypes.UPDATE_DISC_WEAR:
      return {
        ...state,
        discs: state.discs.map((disc) => {
          if (disc.baggedDiscId === action.baggedDiscId) return { ...disc, wear: action.wear };
          return disc;
        }),
      };
    case bagActionTypes.DISABLE_DISC:
    case bagActionTypes.ENABLE_DISC:
      return {
        ...state,
        discs: state.discs.map((disc) => {
          if (disc.baggedDiscId === action.baggedDiscId) {
            return { ...disc, enabled: action.enabled };
          }
          return disc;
        }),
      };
    case bagActionTypes.REMOVE_DISC_FROM_BAG:
      return {
        ...state,
        discs: _.filter(state.discs, disc => disc.baggedDiscId !== action.baggedDiscId),
      };
    default:
      return state;
  }
};

export default disc;
