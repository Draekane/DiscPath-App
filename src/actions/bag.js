// External Imports
import _ from 'lodash';
// Internal Imports
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

export const setDiscWear = wear => ({
  type: bagActionTypes.UPDATE_DISC_WEAR,
  wear,
});

export const removeDiscFromBag = baggedDiscId => ({
  type: bagActionTypes.REMOVE_DISC_FROM_BAG,
  baggedDiscId,
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

export const addNewBagStart = () => ({
  type: bagActionTypes.ADD_NEW_BAG_START,
});

export const addNewBagFinish = bagName => ({
  type: bagActionTypes.ADD_NEW_BAG_FINISH,
  bagName,
});

export const addNewBagCancel = () => ({
  type: bagActionTypes.ADD_NEW_BAG_CANCEL,
});

export const updateBagNameStart = () => ({
  type: bagActionTypes.UPDATE_BAG_NAME_START,
});

export const updateBagNameFinish = bagName => ({
  type: bagActionTypes.UPDATE_BAG_NAME_FINISH,
  bagName,
});

export const updateBagNameCancel = () => ({
  type: bagActionTypes.UPDATE_BAG_NAME_CANCEL,
});

export const removeExistingBag = () => ({
  type: bagActionTypes.REMOVE_EXISTING_BAG,
});

export const openDiscEditModal = discId => ({
  type: bagActionTypes.OPEN_DISC_EDIT_MODAL,
  discId,
});

export const closeDiscEditModal = () => ({
  type: bagActionTypes.CLOSE_DISC_EDIT_MODAL,
});

export const editDiscName = displayName => ({
  type: bagActionTypes.EDIT_DISC_NAME,
  displayName,
});

export const editDiscWeight = weight => ({
  type: bagActionTypes.EDIT_DISC_WEIGHT,
  weight,
});

export const editDiscPower = power => ({
  type: bagActionTypes.EDIT_DISC_POWER,
  power,
});

export const editDiscThrowType = throwType => ({
  type: bagActionTypes.EDIT_DISC_THROW_TYPE,
  throwType,
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

export const checkBagForUpdates = (companies, bag) => {
  const updateBag = {
    ...bag,
    bags: _.map(bag.bags, bag2 => ({
      ...bag2,
      discs: _.map(bag2.discs, (disc) => {
        const companySet = _.find(companies, comp => comp.company === disc.company);
        const updateDisc = _.find(companySet.discs, cdisc => cdisc.discId === disc.discId);
        return {
          ...disc,
          hst: updateDisc.hst,
          lsf: updateDisc.lsf,
          range: updateDisc.range,
          type: updateDisc.type,
          maxWeight: updateDisc.maxWeight,
          pdga: updateDisc.pdga,
          matrix_x: updateDisc.matrix_x,
          matrix_y: updateDisc.matrix_y,
        };
      }),
    })),
  };

  return {
    type: bagActionTypes.CHECK_BAG_FOR_UPDATES,
    updateBag,
  };
};
