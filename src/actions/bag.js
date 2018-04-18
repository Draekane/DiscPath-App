import * as bagActionTypes from '../actionTypes/bag';

export const loadDisc = (disc) => {
  return {
    type: bagActionTypes.ADD_DISC_TO_BAG,
    disc,
  };
}