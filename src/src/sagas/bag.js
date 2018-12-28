import { put, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';
import { saveAs } from 'file-saver';
import * as actions from '../actions/bag';
import * as actionTypes from '../actionTypes/bag';

export function* addDiscToBagSaga({ disc, bag }) {
  if (!disc || !bag) {
    yield put(actions.addDiscToBagFailure('Disc or Bag are not present'));
  }
  const newBag = {
    ...bag,
    discs: [
      ...bag.discs,
      {
        ...disc,
        baggedDiscId: (_.max(_.map(bag.discs, disc => disc.baggedDiscId)) || 0) + 1,
      },
    ],
  };
  yield put(actions.addDiscToBagSuccess(newBag));
}

export function* removeDiscFromBagSaga({ disc, bag }) {
  if (!disc || !bag) {
    yield put(actions.removeDiscFromBagFailure('Disc or Bag are not present'));
  }
  try {
    const newBag = {
      ...bag,
      discs: _.filter(bag.discs, d => d.baggedDiscId !== disc.baggedDiscId),
    };
    yield put(actions.removeDiscFromBagSuccess(newBag));
  } catch (err) {
    yield put(actions.removeDiscFromBagFailure(err));
  }
}

export function* updateDiscWearSaga({ wear, disc, bag }) {
  if (!wear || !disc || !bag) {
    yield put(actions.updateDiscWearFailure('Wear, Disc, or Bag are not present'));
  }
  const newBag = {
    ...bag,
    discs: _.map(bag.discs, (d) => {
      if (d.baggedDiscId === disc.baggedDiscId) {
        return { ...disc, wear };
      }
      return d;
    }),
  };

  yield put(actions.updateDiscWearSuccess(newBag));
}

export function* editDiscWeightSaga({ weight, disc, bag }) {
  if (!weight || !disc || !bag) {
    yield put(actions.editDiscWeightFailure('Weight, Disc, or Bag are not present'));
  }
  const newBag = {
    ...bag,
    discs: _.map(bag.discs, (d) => {
      if (d.baggedDiscId === disc.baggedDiscId) {
        return { ...disc, weight };
      }
      return d;
    }),
  };

  yield put(actions.editDiscWeightSuccess(newBag));
}

export function* editDiscPowerSaga({ power, disc, bag }) {
  if (!power || !disc || !bag) {
    yield put(actions.editDiscPowerFailure('Power, Disc, or Bag are not present'));
  }
  const newBag = {
    ...bag,
    discs: _.map(bag.discs, (d) => {
      if (d.baggedDiscId === disc.baggedDiscId) {
        return { ...disc, power };
      }
      return d;
    }),
  };

  yield put(actions.editDiscPowerSuccess(newBag));
}

export function* editDiscThrowTypeSaga({ throwType, disc, bag }) {
  if (!throwType || !disc || !bag) {
    yield put(actions.editDiscThrowTypeFailure('ThrowType, Disc, or Bag are not present'));
  }
  const newBag = {
    ...bag,
    discs: _.map(bag.discs, (d) => {
      if (d.baggedDiscId === disc.baggedDiscId) {
        return { ...disc, throwType };
      }
      return d;
    }),
  };

  yield put(actions.editDiscThrowTypeSuccess(newBag));
}

export function* editDiscNameSaga({ displayName, disc, bag }) {
  if (!displayName || !disc || !bag) {
    yield put(actions.editDiscNameFailure('Display Name, Disc, or Bag are not present'));
  }
  const newBag = {
    ...bag,
    discs: _.map(bag.discs, (d) => {
      if (d.baggedDiscId === disc.baggedDiscId) {
        return { ...disc, displayName };
      }
      return d;
    }),
  };

  yield put(actions.editDiscNameSuccess(newBag));
}

export function* editDiscEnabledSaga({ enabled, disc, bag }) {
  if (!enabled || !disc || !bag) {
    yield put(actions.editDiscEnabledFailure('Enabled, Disc, or Bag are not present'));
  }
  const newBag = {
    ...bag,
    discs: _.map(bag.discs, (d) => {
      if (d.baggedDiscId === disc.baggedDiscId) {
        return { ...disc, enabled };
      }
      return d;
    }),
  };

  yield put(actions.editDiscEnabledSuccess(newBag));
}

export function* editDiscTypeEnabledSaga({ enabled, discType, bag }) {
  if (!enabled || !discType || !bag) {
    yield put(actions.editDiscTypeEnabledFailure('Enabled, Disc Type, or Bag are not present'));
  }
  const newBag = {
    ...bag,
    discs: _.map(bag.discs, (d) => {
      if (d.discType === discType.discType) {
        return { ...d, enabled };
      }
      return d;
    }),
  };

  const newDiscType = { ...discType, enabled };

  yield put(actions.editDiscTypeEnabledSuccess(newBag, newDiscType));
}

export function* exportBagsToFileSaga({ bags }) {
  if (!bags || bags.length === 0) {
    yield put(actions.exportBagsToFileFailure('No Bags exist to export'));
  }
  try {
    const thisFile = new Blob([JSON.stringify(bags)], { type: 'text/plain;charset=utf-8' });
    saveAs(thisFile, 'bag.json');
    yield put(actions.exportBagsToFileSuccess());
  } catch (err) {
    yield put(actions.exportBagsToFileFailure(err));
  }
}

export function* selectBagSaga({ selectBagId }) {
  if (!selectBagId) {
    yield put(actions.selectBagFailure('Select Bag Id Not Present'));
  }
  try {
    const newBagId = parseInt(selectBagId, 10);
    yield put(actions.selectBagSuccess(newBagId));
  } catch (err) {
    yield put(actions.selectBagFailure(err));
  }
}

export function* addNewBagSaga({ name, bags }) {
  if (!name || !bags) {
    yield put(actions.addNewBagFailure('New Bag Name or Bags was not present'));
  }
  const newBags = [
    ...bags,
    {
      name,
      bagId: _.max(_.map(bags, bag => bag.bagId)) + 1,
      discs: [],
    },
  ];

  yield put(actions.addNewBagSuccess(newBags));
  yield put(actions.addNewBagFinish());
}

export function* editBagNameSaga({ name, bag }) {
  if (!name || !bag) {
    yield put(actions.editBagNameFailure('Name or Bag was not present'));
  }
  const newBag = {
    ...bag,
    name,
  };
  yield put(actions.editBagNameSuccess(newBag));
}

export function* checkForBagUpdateSaga({ companies, bag }) {
  if (!companies || !bag) yield put(actions.checkBagForUpdateFailure('Companies or Bag are not present'));
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
  yield put(actions.checkBagForUpdateSuccess(updateBag));
}

export function* removeExistingBagSaga({ bags, bag }) {
  if (!bags || !bag) {
    yield put(actions.removeExistingBagFailure('No Bag to remove or bags to remove from'));
  }
  let newBags = _.filter(bags, b => b.bagId !== bag.bagId);
  if (!newBags || newBags.length === 0) {
    newBags = [{
      name: 'Default Bag',
      bagId: -1,
      discs: [],
    }];
  }
  yield put(actions.removeExistingBagSuccess(newBags));
}

export default function* () {
  yield takeEvery(actionTypes.CHECK_BAG_FOR_UPDATES, checkForBagUpdateSaga);
  yield takeEvery(actionTypes.ADD_DISC_TO_BAG, addDiscToBagSaga);
  yield takeEvery(actionTypes.UPDATE_DISC_WEAR, updateDiscWearSaga);
  yield takeEvery(actionTypes.EDIT_DISC_WEIGHT, editDiscWeightSaga);
  yield takeEvery(actionTypes.EDIT_DISC_POWER, editDiscPowerSaga);
  yield takeEvery(actionTypes.EDIT_DISC_THROW_TYPE, editDiscThrowTypeSaga);
  yield takeEvery(actionTypes.EDIT_DISC_NAME, editDiscNameSaga);
  yield takeEvery(actionTypes.EDIT_DISC_ENABLED, editDiscEnabledSaga);
  yield takeEvery(actionTypes.EDIT_DISC_TYPE_ENABLED, editDiscTypeEnabledSaga);
  yield takeEvery(actionTypes.REMOVE_DISC_FROM_BAG, removeDiscFromBagSaga);
  yield takeEvery(actionTypes.EXPORT_BAGS_TO_FILE, exportBagsToFileSaga);
  yield takeEvery(actionTypes.SELECT_BAG, selectBagSaga);
  yield takeEvery(actionTypes.ADD_NEW_BAG, addNewBagSaga);
  yield takeEvery(actionTypes.REMOVE_EXISTING_BAG, removeExistingBagSaga);
  yield takeEvery(actionTypes.EDIT_BAG_NAME, editBagNameSaga);
}
