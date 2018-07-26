import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import _ from 'lodash';

import * as displayOptionActions from '../../src/actions/displayOptions';
import * as displayOptionActionTypes from '../../src/actionTypes/displayOptions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Display Options Actions Tests', () => {
  describe('changeFanPower', () => {
    const tester = (expectedActions) => {
      const store = mockStore({});

      return Promise.resolve(store.dispatch(displayOptionActions.changeFanPower()))
        .then(() => {
          const actionsDispatched = _.map(store.getActions(), action => action.type);
          return expect(actionsDispatched).toEqual(expectedActions);
        });
    };

    it('should create an object of the correct type', () => {
      // ARRANGE
      const expectedActions = [
        displayOptionActionTypes.CHANGE_FAN_POWER,
      ];

      // ACT & ASSERT
      return tester(expectedActions);
    });
  });

  describe('changeLieCircles', () => {
    const tester = (expectedActions) => {
      const store = mockStore({});

      return Promise.resolve(store.dispatch(displayOptionActions.changeLieCircles()))
        .then(() => {
          const actionsDispatched = _.map(store.getActions(), action => action.type);
          return expect(actionsDispatched).toEqual(expectedActions);
        });
    };

    it('should create an object of the correct type', () => {
      // ARRANGE
      const expectedActions = [
        displayOptionActionTypes.CHANGE_LIE_CIRCLE,
      ];

      // ACT & ASSERT
      return tester(expectedActions);
    });
  });

  describe('changeLieDistance', () => {
    const tester = (expectedActions) => {
      const store = mockStore({});

      return Promise.resolve(store.dispatch(displayOptionActions.changeLieDistance()))
        .then(() => {
          const actionsDispatched = _.map(store.getActions(), action => action.type);
          return expect(actionsDispatched).toEqual(expectedActions);
        });
    };

    it('should create an object of the correct type', () => {
      // ARRANGE
      const expectedActions = [
        displayOptionActionTypes.CHANGE_LIE_DISTANCE,
      ];

      // ACT & ASSERT
      return tester(expectedActions);
    });
  });

  describe('changePaths', () => {
    const tester = (expectedActions) => {
      const store = mockStore({});

      return Promise.resolve(store.dispatch(displayOptionActions.changePaths()))
        .then(() => {
          const actionsDispatched = _.map(store.getActions(), action => action.type);
          return expect(actionsDispatched).toEqual(expectedActions);
        });
    };

    it('should create an object of the correct type', () => {
      // ARRANGE
      const expectedActions = [
        displayOptionActionTypes.CHANGE_PATHS,
      ];

      // ACT & ASSERT
      return tester(expectedActions);
    });
  });
});
