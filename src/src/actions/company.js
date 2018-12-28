import * as companyActionTypes from '../actionTypes/company';

export const loadCompanies = () => ({
  type: companyActionTypes.LOAD_COMPANY_DATA,
});

export const loadCompaniesSuccess = companies => ({
  type: companyActionTypes.LOAD_COMPANY_DATA_SUCCESS,
  companies,
});

export const loadCompaniesFailure = error => ({
  type: companyActionTypes.LOAD_COMPANY_DATA_FAILURE,
  error,
});

export const selectDisc = disc => ({
  type: companyActionTypes.SELECT_COMPANY_DISC,
  disc,
});
