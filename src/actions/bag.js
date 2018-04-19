import * as bagActionTypes from '../actionTypes/bag';

export const loadDisc = disc => ({
  type: bagActionTypes.ADD_DISC_TO_BAG,
  disc,
});

export const setDiscEnable = (baggedDiscId, enable) => ({
  type: enable ? bagActionTypes.DISABLE_DISC : bagActionTypes.ENABLE_DISC,
  baggedDiscId,
  enabled: !enable,
});

export const setDiscWear = (baggedDiscId, wear) => ({
  type: bagActionTypes.UPDATE_DISC_WEAR,
  baggedDiscId,
  wear,
});

export const removeDiscFromBag = baggedDiscId => ({
  type: bagActionTypes.REMOVE_DISC_FROM_BAG,
  baggedDiscId,
});
