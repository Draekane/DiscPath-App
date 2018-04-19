import _ from 'lodash';
import * as companyActionTypes from '../actionTypes/company';

export const loadCompanies = () => {
  const context = require.context('../data/Discs', true, /\.(json)$/);
  const companies = [];

  context.keys().forEach((filename) => {
    const company = context(filename);
    const { discs } = company;
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
