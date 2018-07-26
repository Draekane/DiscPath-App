import _ from 'lodash';
import * as companyActionTypes from '../actionTypes/company';

export const loadCompanies = () => {
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

  return {
    type: companyActionTypes.LOAD_COMPANY_DATA,
    companies,
  };
};

export const selectDisc = disc => ({
  type: companyActionTypes.SELECT_COMPANY_DISC,
  disc,
});
