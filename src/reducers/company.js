import update from 'immutability-helper';

import * as companyActionTypes from '../actionTypes/company';

const intiialState = {
  companies: [],
};

const company = (state = intiialState, action = {}) => {
  switch (action.type) {
    case companyActionTypes.LOAD_COMPANY_DATA:
      return (() => {
        const { companies } = action.data;

        if (!companies) {
          return state;
        }
        return update(
          state,
          {
            companies: {
              $set: companies,
            },
          },
        );
      })();
    default:
      return state;
  }
};

export default company;
