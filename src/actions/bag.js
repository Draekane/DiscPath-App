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

export const setDiscTypeEnable = (discType, enable) => ({
  type: enable ? bagActionTypes.DISABLE_DISC_TYPE : bagActionTypes.ENABLE_DISC_TYPE,
  discType,
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

export const changeThrowerType = throwerType => ({
  type: bagActionTypes.CHANGE_THROWER_TYPE,
  throwerType,
});

export const changeThrowerPower = throwerPower => ({
  type: bagActionTypes.CHANGE_THROWER_POWER,
  throwerPower,
});

export const changeFanPower = () => ({
  type: bagActionTypes.CHANGE_FAN_POWER,
});

export const changePaths = paths => ({
  type: bagActionTypes.CHANGE_PATHS,
  paths,
});

export const changeLieDistance = () => ({
  type: bagActionTypes.CHANGE_LIE_DISTANCE,
});

export const changeLieCircles = () => ({
  type: bagActionTypes.CHANGE_LIE_CIRCLE,
});

export const exportBagsToFile = () => ({
  type: bagActionTypes.EXPORT_BAGS_TO_FILE,
});

export const importBagsFromFile = fileData => ({
  type: bagActionTypes.IMPORT_BAGS_FROM_FILE,
  fileData,
});

export const selectBag = selectBagId => ({
  type: bagActionTypes.SELECT_BAG,
  selectBagId,
});

export const addNewBag = bagName => ({
  type: bagActionTypes.ADD_NEW_BAG,
  bagName,
});

export const updateBagName = bagName => ({
  type: bagActionTypes.UPDATE_BAG_NAME,
  bagName,
});

export const removeExistingBag = bagId => ({
  type: bagActionTypes.REMOVE_DISC_FROM_BAG,
  bagId,
});