import expect from 'expect';
import _ from 'lodash';

import * as throwerActions from '../../src/actions/thrower';
import throwerReducer from '../../src/reducers/thrower';

const initialState = throwerReducer();

describe('Thrower Reducer Test', () => {
  describe('Initialization', () => {
    it('Should not be empty', () => {
      expect(initialState.throwType).toEqual('rhbh');
      expect(initialState.power).toEqual(32);
    });
  });

  describe('CHANGE_THROWER_POWER', () => {
    it('Should change the high-level Thrower Power', () => {
      const testInitialState = _.cloneDeep(initialState);
      const action = throwerActions.changeThrowerPower(27);

      const target = throwerReducer(testInitialState, action);

      expect(target.power).toEqual(27);
    });
  });

  describe('CHANGE_THROWER_TYPE', () => {
    it('Should change the high-level Thrower Type', () => {
      const testInitialState = _.cloneDeep(initialState);
      const action = throwerActions.changeThrowerType('lhbh');

      const target = throwerReducer(testInitialState, action);

      expect(target.throwType).toEqual('lhbh');
    });
  });
});
