import update from 'immutability-helper';

import * as discActionTypes from '../actionTypes/disc';

const intiialState = {
  discId: -1,
  company: null,
  name: null,
  range: 0,
  hst: 0,
  lsf: 0,
  type: null,
  enabled: true,
  wear: 10,
};

const disc = (state = intiialState, action = {}) => {
  switch (action.type) {
    case discActionTypes.LOAD_DISC_DATA:
      return (() => {
        const { discData } = action.data;

        if (!discData) {
          return state;
        }
        return update(
          state,
          {
            discId: {
              $set: discData.discId,
            },
            company: {
              $set: discData.company,
            },
            name: {
              $set: discData.name,
            },
            range: {
              $set: discData.range,
            },
            hst: {
              $set: discData.hst,
            },
            lsf: {
              $set: discData.lsf,
            },
            type: {
              $set: discData.type,
            },
            enabled: {
              $set: discData.enabled,
            },
            wear: {
              $set: discData.wear,
            },
          },
        );
      })();
    case discActionTypes.UPDATE_DISC_WEAR:
      return update(
        state,
        {
          wear: {
            $set: action.data.wear,
          },
        },
      );
    case discActionTypes.DISABLE_DISC:
      return update(
        state,
        {
          enabled: {
            $set: false,
          },
        },
      );
    case discActionTypes.ENABLE_DISC:
      return update(
        state,
        {
          enabled: {
            $set: true,
          },
        },
      );
    default:
      return state;
  }
};

export default disc;
