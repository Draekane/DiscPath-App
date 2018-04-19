import { createSelector } from 'reselect';
import { get, isEmpty } from 'lodash';

const getCompanies = (state) => {
  const companies = get(state, 'company.companies', null);

  return !isEmpty(companies) ? companies : null;
};

export const currentCompaniesSelector = createSelector(
  [getCompanies],
  currentCompanies => currentCompanies,
);

const getCurrentSelection = (state) => {
  const currentSelection = get(state, 'company.currentSelection', null);

  return !isEmpty(currentSelection) ? currentSelection : null;
};

export const currentSelectionSelector = createSelector(
  [getCurrentSelection],
  selection => selection,
);

export default currentCompaniesSelector;
