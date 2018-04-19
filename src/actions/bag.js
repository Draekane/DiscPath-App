import * as bagActionTypes from '../actionTypes/bag';

export const loadDisc = (disc) => {
  return {
    type: bagActionTypes.ADD_DISC_TO_BAG,
    disc,
  };
}

export const setDiscEnable = (baggedDiscId, enable) => {
    return {
      type: enable ? bagActionTypes.DISABLE_DISC : bagActionTypes.ENABLE_DISC,
      baggedDiscId,
      enabled: !enable
    }
}

export const setDiscWear = (baggedDiscId, wear) => {
  return {
    type: bagActionTypes.UPDATE_DISC_WEAR,
    baggedDiscId,
     wear,
  }
}