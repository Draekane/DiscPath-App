import _ from 'lodash';
import * as similarDiscActionTypes from '../actionTypes/similarDisc';

const initialState = {
  similarity: 0.1,
  similarDiscs: [],
  selectedDisc: null,
  selectedDiscId: null,
};

const thrower = (state = initialState, action = {}) => {
  switch (action.type) {
    case similarDiscActionTypes.SIMILARITY_CHANGE:
      return {
        ...state,
        similarity: action.similarity,
      };
    case similarDiscActionTypes.SIMILAR_SELECT_DISC:
      return {
        ...state,
        selectedDisc: action.selectedDisc,
        selectedDiscId: action.selectedDiscId,
      };
    case similarDiscActionTypes.SIMILAR_SET_SIMILAR_DISCS:
      return {
        ...state,
        similarDiscs: (state.similarDiscs.length < action.similarDiscs.length) ?
          _.unionBy(state.similarDiscs, action.similarDiscs, disc => disc.discId) :
          _.intersectionBy(state.similarDiscs, action.similarDiscs, disc => disc.discId),
      };
    case similarDiscActionTypes.SIMILAR_CLEAR_SELECT_DISC:
      return {
        ...state,
        similarDiscs: [],
        selectedDisc: null,
        selectedDiscId: null,
      };
    case similarDiscActionTypes.SIMILAR_ENABLE_SELECT_DISC:
      return {
        ...state,
        selectedDisc: { ...state.selectedDisc, enabled: !action.enabled },
      };
    case similarDiscActionTypes.SIMILAR_ENABLE_SIMILAR_DISC:
      return {
        ...state,
        similarDiscs: _.map(state.similarDiscs, (disc) => {
          if (disc.discId === action.discId) {
            return { ...disc, enabled: !action.enabled };
          } return disc;
        }),
      };
    default:
      return state;
  }
};

export default thrower;
