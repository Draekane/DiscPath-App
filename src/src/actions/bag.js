// Internal Imports
import * as bagActionTypes from '../actionTypes/bag';

export const addDiscToBag = (disc, bag) => ({
  type: bagActionTypes.ADD_DISC_TO_BAG,
  disc,
  bag,
});

export const addDiscToBagSuccess = bag => ({
  type: bagActionTypes.ADD_DISC_TO_BAG_SUCCESS,
  bag,
});

export const addDiscToBagFailure = error => ({
  type: bagActionTypes.ADD_DISC_TO_BAG_FAILURE,
  error,
});

export const updateDiscWear = (wear, disc, bag) => ({
  type: bagActionTypes.UPDATE_DISC_WEAR,
  wear,
  disc,
  bag,
});

export const updateDiscWearSuccess = bag => ({
  type: bagActionTypes.UPDATE_DISC_WEAR_SUCCESS,
  bag,
});

export const updateDiscWearFailure = error => ({
  type: bagActionTypes.UPDATE_DISC_WEAR_FAILURE,
  error,
});

export const editDiscWeight = (weight, disc, bag) => ({
  type: bagActionTypes.EDIT_DISC_WEIGHT,
  weight,
  disc,
  bag,
});

export const editDiscWeigthSuccess = bag => ({
  type: bagActionTypes.EDIT_DISC_WEIGHT_SUCCESS,
  bag,
});

export const editDiscWeightFailure = error => ({
  type: bagActionTypes.EDIT_DISC_WEIGHT_FAILURE,
  error,
});

export const editDiscPower = (power, disc, bag) => ({
  type: bagActionTypes.EDIT_DISC_POWER,
  power,
  disc,
  bag,
});

export const editDiscPowerSuccess = bag => ({
  type: bagActionTypes.EDIT_DISC_POWER_SUCCESS,
  bag,
});

export const editDiscPowerFailure = error => ({
  type: bagActionTypes.EDIT_DISC_POWER_FAILURE,
  error,
});

export const editDiscThrowType = (throwType, disc, bag) => ({
  type: bagActionTypes.EDIT_DISC_THROW_TYPE,
  throwType,
  disc,
  bag,
});

export const editDiscThrowTypeSuccess = bag => ({
  type: bagActionTypes.EDIT_DISC_THROW_TYPE_SUCCESS,
  bag,
});

export const editDiscThrowTypeFailure = error => ({
  type: bagActionTypes.EDIT_DISC_THROW_TYPE_FAILURE,
  error,
});

export const editDiscName = (displayName, disc, bag) => ({
  type: bagActionTypes.EDIT_DISC_NAME,
  displayName,
  disc,
  bag,
});

export const editDiscNameSuccess = bag => ({
  type: bagActionTypes.EDIT_DISC_NAME_SUCCESS,
  bag,
});

export const editDiscNameFailure = error => ({
  type: bagActionTypes.EDIT_DISC_NAME_FAILURES,
  error,
});

export const editDiscEnabled = (enabled, disc, bag) => ({
  type: bagActionTypes.EDIT_DISC_ENABLED,
  enabled,
  disc,
  bag,
});

export const editDiscEnabledSuccess = bag => ({
  type: bagActionTypes.EDIT_DISC_ENABLED_SUCCESS,
  bag,
});

export const editDiscEnabledFailure = error => ({
  type: bagActionTypes.EDIT_DISC_ENABLED_FAILURE,
  error,
});

export const editDiscTypeEnabled = (enabled, discType, bag) => ({
  type: bagActionTypes.EDIT_TYPE_DISC_ENABLED,
  enabled,
  discType,
  bag,
});

export const editDiscTypeEnabledSuccess = (bag, discType) => ({
  type: bagActionTypes.EDIT_DISC_TYPE_ENABLED_SUCCESS,
  bag,
  discType,
});

export const editDiscTypeEnabledFailure = error => ({
  type: bagActionTypes.EDIT_DISC_TYPE_ENABLED_FAILURE,
  error,
});


export const removeDiscFromBag = ({ disc, bag }) => ({
  type: bagActionTypes.REMOVE_DISC_FROM_BAG,
  disc,
  bag,
});

export const removeDiscFromBagSuccess = bag => ({
  type: bagActionTypes.REMOVE_DISC_FROM_BAG,
  bag,
});

export const removeDiscFromBagFailure = error => ({
  type: bagActionTypes.REMOVE_DISC_FROM_BAG,
  error,
});

export const exportBagsToFile = () => ({
  type: bagActionTypes.EXPORT_BAGS_TO_FILE,
});

export const exportBagsToFileSuccess = () => ({
  type: bagActionTypes.EXPORT_BAGS_TO_FILE_SUCCESS,
});

export const exportBagToFileFailure = error => ({
  type: bagActionTypes.EXPORT_BAGS_TO_FILE_FAILURE,
  error,
});

export const importBagsFromFile = fileData => ({
  type: bagActionTypes.IMPORT_BAGS_FROM_FILE,
  fileData,
});

export const selectBag = selectBagId => ({
  type: bagActionTypes.SELECT_BAG,
  selectBagId,
});

export const selectBagSuccess = newBagId => ({
  type: bagActionTypes.SELECT_BAG,
  newBagId,
});

export const selectBagFailure = error => ({
  type: bagActionTypes.SELECT_BAG_FAILURE,
  error,
});

export const addNewBagStart = () => ({
  type: bagActionTypes.ADD_NEW_BAG_START,
});

export const addNewBagFinish = () => ({
  type: bagActionTypes.ADD_NEW_BAG_FINISH,
});

export const addNewBagCancel = () => ({
  type: bagActionTypes.ADD_NEW_BAG_CANCEL,
});

export const addNewBag = (name, bags) => ({
  type: bagActionTypes.ADD_NEW_BAG,
  name,
  bags,
});

export const addNewBagSuccess = bags => ({
  type: bagActionTypes.ADD_DISC_TO_BAG_SUCCESS,
  bags,
});

export const addNewBagFailure = error => ({
  type: bagActionTypes.ADD_DISC_TO_BAG_FAILURE,
  error,
});


export const updateBagNameStart = () => ({
  type: bagActionTypes.UPDATE_BAG_NAME_START,
});

export const updateBagNameFinish = () => ({
  type: bagActionTypes.UPDATE_BAG_NAME_FINISH,
});

export const updateBagNameCancel = () => ({
  type: bagActionTypes.UPDATE_BAG_NAME_CANCEL,
});

export const editBagName = (name, bag) => ({
  type: bagActionTypes.EDIT_BAG_NAME,
  name,
  bag,
});

export const editBagNameSuccess = bag => ({
  type: bagActionTypes.EDIT_BAG_NAME_SUCCESS,
  bag,
});

export const editBagNameFailure = error => ({
  type: bagActionTypes.EDIT_BAG_NAME_FAILURE,
  error,
});

export const removeExistingBag = (bags, bag) => ({
  type: bagActionTypes.REMOVE_EXISTING_BAG,
  bags,
  bag,
});

export const removeExistingBagSuccess = bags => ({
  type: bagActionTypes.REMOVE_EXISTING_BAG_SUCCESS,
  bags,
});

export const removeExistingBagFailure = error => ({
  type: bagActionTypes.REMOVE_EXISTING_BAG_FAILURE,
  error,
});

export const openDiscEditModal = discId => ({
  type: bagActionTypes.OPEN_DISC_EDIT_MODAL,
  discId,
});

export const closeDiscEditModal = () => ({
  type: bagActionTypes.CLOSE_DISC_EDIT_MODAL,
});

export const enlargeMap = () => ({
  type: bagActionTypes.ENLARG_MAP,
});

export const shrinkMap = () => ({
  type: bagActionTypes.SHRINK_MAP,
});

export const resetMap = () => ({
  type: bagActionTypes.RESET_MAP,
});

export const checkBagForUpdates = (companies, bag) => ({
  type: bagActionTypes.CHECK_BAG_FOR_UPDATES,
  companies,
  bag,
});

export const checkBagForUpdateSuccess = updateBag => ({
  type: bagActionTypes.CHECK_BAG_FOR_UPDATES_SUCCESS,
  updateBag,
});

export const checkBagForUpdateFailure = error => ({
  type: bagActionTypes.CHECK_BAG_FOR_UPDATES_FAILURE,
  error,
});

export const setTheme = darkTheme => ({
  type: bagActionTypes.SET_MAP_THEME,
  darkTheme,
});
