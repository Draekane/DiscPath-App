import * as companyActionTypes from '../actionTypes/company';

const intiialState = {
  companies: null,
  currentSelection: null,
};

const company = (state = intiialState, action = {}) => {
  switch (action.type) {
    case companyActionTypes.LOAD_COMPANY_DATA:
      if (!action.companies) {
        return state;
      }
      return { ...state, companies: action.companies };
    case companyActionTypes.SELECT_COMPANY_DISC:
      return { ...state, currentSelection: action.disc };
    default:
      return state;
  }
};

export default company;
