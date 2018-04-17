// import _ from 'lodash';

import * as companyActionTypes from '../actionTypes/company';

export const loadCompaniesAction = () => {
  const context = require.context('../data/Discs', true, /\.(json)$/);
  const companies = [];

  context.keys().forEach((filename) => {
    const company = context(filename);
    companies.push(company);
  });

  return {
    type: companyActionTypes.LOAD_COMPANY_DATA,
    companies,
  };
};

export const loadCompanies = () => loadCompaniesAction();
