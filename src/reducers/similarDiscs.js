import _ from 'lodash';
import * as similarDiscActionTypes from '../actionTypes/similarDisc';

const initialState = {
  similarity: 0.1,
  similarDiscs: [],
  similarDiscEditModal: false,
  selectedDisc: null,
  selectedDiscId: null,
};

const getSimilarDiscs = (state, action) => {
  if (action.reset) return action.similarDiscs;
  return (state.similarDiscs.length < action.similarDiscs.length) ?
    _.unionBy(state.similarDiscs, action.similarDiscs, disc => disc.discId) :
    _.intersectionBy(state.similarDiscs, action.similarDiscs, disc => disc.discId);
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
        selectedDisc: { ...action.selectedDisc, wear: 10, originalRange: action.selectedDisc.range },
        selectedDiscId: action.selectedDiscId,
      };
    case similarDiscActionTypes.SIMILAR_SET_SIMILAR_DISCS:
      return {
        ...state,
        similarDiscs: getSimilarDiscs(state, action),
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
    case similarDiscActionTypes.SIMILAR_TOGGLE_SELECT_EDIT_MODAL:
      return {
        ...state,
        similarDiscEditModal: !state.similarDiscEditModal,
      };
    case similarDiscActionTypes.SIMILAR_EDIT_SELECT_WEIGHT:
      return {
        ...state,
        selectedDisc: {
          ...state.selectedDisc,
          weight: action.weight,
        },
      };
    case similarDiscActionTypes.SIMILAR_EDIT_SELECT_WEAR:
      return {
        ...state,
        selectedDisc: {
          ...state.selectedDisc,
          wear: action.wear,
        },
      };
    case similarDiscActionTypes.SIMILAR_EDIT_SELECT_POWER:
      return {
        ...state,
        selectedDisc: {
          ...state.selectedDisc,
          power: action.power,
        },
      };
    default:
      return state;
  }
};

export default thrower;
