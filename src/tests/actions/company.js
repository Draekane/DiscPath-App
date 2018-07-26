import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import _ from 'lodash';

import * as companyActions from '../../src/actions/company';
import * as companyActionTypes from '../../src/actionTypes/company';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Company Actions Tests', () => {
  describe('selectDisc', () => {
    const tester = (expectedActions) => {
      const store = mockStore({});

      return Promise.resolve(store.dispatch(companyActions.selectDisc()))
        .then(() => {
          const actionsDispatched = _.map(store.getActions(), action => action.type);
          return expect(actionsDispatched).toEqual(expectedActions);
        });
    };

    it('should create an object of the correct type', () => {
      // ARRANGE
      const expectedActions = [
        companyActionTypes.SELECT_COMPANY_DISC,
      ];

      // ACT & ASSERT
      return tester(expectedActions);
    });
  });
});
