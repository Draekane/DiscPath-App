import * as companyActionTypes from '../actionTypes/company';

const intiialState = {
  companies: null,
};

const company = (state = intiialState, action = {}) => {
  switch (action.type) {
    case companyActionTypes.LOAD_COMPANY_DATA:
      if (!action.companies) {
        return state;
      }
      return { ...state, companies: action.companies };
    default:
      return state;
  }
};

export default company;
