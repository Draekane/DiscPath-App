import * as displayOptionActionTypes from '../actionTypes/displayOptions';

export const changeFanPower = () => ({
  type: displayOptionActionTypes.CHANGE_FAN_POWER,
});

export const changePaths = paths => ({
  type: displayOptionActionTypes.CHANGE_PATHS,
  paths,
});

export const changeLieDistance = () => ({
  type: displayOptionActionTypes.CHANGE_LIE_DISTANCE,
});

export const changeLieCircles = () => ({
  type: displayOptionActionTypes.CHANGE_LIE_CIRCLE,
});
