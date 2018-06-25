import * as throwerActionTypes from '../actionTypes/thrower';

export const changeThrowerType = throwerType => ({
  type: throwerActionTypes.CHANGE_THROWER_TYPE,
  throwerType,
});

export const changeThrowerPower = throwerPower => ({
  type: throwerActionTypes.CHANGE_THROWER_POWER,
  throwerPower,
});
