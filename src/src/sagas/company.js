import { put, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';
import * as actions from '../actions/company';
import * as actionTypes from '../actionTypes/company';

export function* loadCompaniesSaga() {
  try {
    const discData = require.context('../data/Discs', true, /\.(json)$/);
    const weightData = require.context('../data/Weights', true, /\.(json)$/);
    const companies = [];
    const weightDataKeys = weightData.keys();

    discData.keys().forEach((filename) => {
      const company = discData(filename);
      let { discs } = company;

      let companyWeight = null;
      let discsWeight = null;

      if (_.includes(weightDataKeys, filename)) {
        companyWeight = weightData(filename);
        discsWeight = companyWeight.discs;
      }

      if (discsWeight) {
        const newDiscs = [];
        discs.forEach((disc) => {
          const discWeight = _.find(discsWeight, dw => dw.discId === disc.discId);
          if (discWeight) newDiscs.push({ ...disc, maxWeight: parseInt(discWeight.maxWeight, 10) });
          else newDiscs.push(disc);
        });
        discs = { ...newDiscs };
      }

      companies.push({ ...company, discs: _.sortBy(discs, d => d.name) });
    });

    yield put(actions.loadCompaniesSuccess(companies));
  } catch (err) {
    yield put(actions.loadCompaniesFailure(err));
  }
}

export default function* () {
  yield takeEvery(actionTypes.LOAD_COMPANY_DATA, loadCompaniesSaga);
}
