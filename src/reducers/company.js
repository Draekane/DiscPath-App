import * as companyActionTypes from '../actionTypes/company';

const intiialState = {
  companies: [],
};

const company = (state = intiialState, action = {}) => {
  switch (action.type) {
    case companyActionTypes.LOAD_COMPANY_DATA:
      const { companies } = action.companies;
      if (!companies) {
        return state;
      }
      return Object.assign({}, state, { companies });
    default:
      return state;
  }
};

export default company;
