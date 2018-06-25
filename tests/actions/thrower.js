import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import _ from 'lodash';

import * as throwerActions from '../../src/actions/thrower';
import * as throwerActionTypes from '../../src/actionTypes/thrower';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Thrower Actions Tests', () => {
  describe('changeThrowerPower', () => {
    const tester = (expectedActions) => {
      const store = mockStore({});

      return Promise.resolve(store.dispatch(throwerActions.changeThrowerPower()))
        .then(() => {
          const actionsDispatched = _.map(store.getActions(), action => action.type);
          return expect(actionsDispatched).toEqual(expectedActions);
        });
    };

    it('should create an object of the correct type', () => {
      // ARRANGE
      const expectedActions = [
        throwerActionTypes.CHANGE_THROWER_POWER,
      ];

      // ACT & ASSERT
      return tester(expectedActions);
    });
  });

  describe('changeThrowerType', () => {
    const tester = (expectedActions) => {
      const store = mockStore({});

      return Promise.resolve(store.dispatch(throwerActions.changeThrowerType()))
        .then(() => {
          const actionsDispatched = _.map(store.getActions(), action => action.type);
          return expect(actionsDispatched).toEqual(expectedActions);
        });
    };

    it('should create an object of the correct type', () => {
      // ARRANGE
      const expectedActions = [
        throwerActionTypes.CHANGE_THROWER_TYPE,
      ];

      // ACT & ASSERT
      return tester(expectedActions);
    });
  });
});
