import expect from 'expect';
import _ from 'lodash';

import * as displayOptionActions from '../../src/actions/displayOptions';
import displayOptionReducer from '../../src/reducers/displayOptions';

const initialState = displayOptionReducer();

describe('Display Option Reducer Test', () => {
  describe('Initialization', () => {
    it('Should not be empty', () => {
      expect(initialState.fanPower).toBeTruthy();
      expect(initialState.lieDistance).toBeTruthy();
      expect(initialState.lieCircle).toBeTruthy();
      expect(initialState.pathsShown).toEqual('one');
    });
  });

  describe('CHANGE_FAN_POWER', () => {
    it('Should change the Display Option Fan Power Display', () => {
      const testInitialState = _.cloneDeep(initialState);
      const action = displayOptionActions.changeFanPower(false);

      const target = displayOptionReducer(testInitialState, action);

      expect(target.fanPower).toBeFalsy();
    });
  });

  describe('CHANGE_LIE_CIRCLE', () => {
    it('Should change the Display Option Lie Circle Display', () => {
      const testInitialState = _.cloneDeep(initialState);
      const action = displayOptionActions.changeLieCircles(false);

      const target = displayOptionReducer(testInitialState, action);

      expect(target.lieCircle).toBeFalsy();
    });
  });

  describe('CHANGE_LIE_DISTANCE', () => {
    it('Should change the Display Option Lie Distance Display', () => {
      const testInitialState = _.cloneDeep(initialState);
      const action = displayOptionActions.changeLieDistance(false);

      const target = displayOptionReducer(testInitialState, action);

      expect(target.lieDistance).toBeFalsy();
    });
  });

  describe('CHANGE_PATHS', () => {
    it('Should change the Display Option Paths to Display', () => {
      const testInitialState = _.cloneDeep(initialState);
      const action = displayOptionActions.changePaths('none');

      const target = displayOptionReducer(testInitialState, action);

      expect(target.pathsShown).toEqual('none');
    });
  });
});
