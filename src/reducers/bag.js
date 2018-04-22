import _ from 'lodash';
import * as bagActionTypes from '../actionTypes/bag';

const intiialState = {
  discs: [],
  thrower: {
    throwType: 'rhbh',
    power: 32,
  },
  displayOptions: {
    fanPower: true,
    pathsShown: 'one',
    lieDistance: true,
    lieCircle: true,
  },
  lastDiscId: 0,
  discTypes: [
    {
      discType: 'D',
      enabled: true,
      title: "Distance Drivers",
    },
    {
      discType: 'F',
      enabled: true,
      title: "Fairway Drivers",
    },
    {
      discType: 'M',
      enabled: true,
      title: "Midranges",
    },
    {
      discType: 'P',
      enabled: true,
      title: "Putt and Approach",
    }
  ]
};

const disc = (state = intiialState, action = {}) => {
  switch (action.type) {
    case bagActionTypes.ADD_DISC_TO_BAG:
      if (action.disc === null) return state;
      return {
        ...state,
        discs: [
          ...state.discs, {
            ...action.disc,
            baggedDiscId: state.lastDiscId + 1,
          },
        ],
        lastDiscId: state.lastDiscId + 1,
      };
    case bagActionTypes.UPDATE_DISC_WEAR:
      return {
        ...state,
        discs: state.discs.map((disc) => {
          if (disc.baggedDiscId === action.baggedDiscId) return { ...disc, wear: action.wear };
          return disc;
        }),
      };
    case bagActionTypes.DISABLE_DISC:
    case bagActionTypes.ENABLE_DISC:
      return {
        ...state,
        discs: state.discs.map((disc) => {
          if (disc.baggedDiscId === action.baggedDiscId) {
            return { ...disc, enabled: action.enabled };
          }
          return disc;
        }),
      };
      case bagActionTypes.DISABLE_DISC_TYPE:
      case bagActionTypes.ENABLE_DISC_TYPE:
      return {
        ...state,
        discs: state.discs.map((disc) => {
          if (disc.type === action.discType) {
            return { ...disc, enabled: action.enabled };
          }
          return disc;
        }),
        discTypes: state.discTypes.map((discType) => {
          if (discType.discType === action.discType) {
            return { ...discType, enabled: action.enabled };
          }
          return discType;
        }),
      };
    case bagActionTypes.REMOVE_DISC_FROM_BAG:
      return {
        ...state,
        discs: _.filter(state.discs, disc => disc.baggedDiscId !== action.baggedDiscId),
      };
    case bagActionTypes.CHANGE_THROWER_TYPE:
      return {
        ...state,
        thrower: {
          ...state.thrower,
          throwType: action.throwerType,
        },
      };
    case bagActionTypes.CHANGE_THROWER_POWER:
      return {
        ...state,
        thrower: {
          ...state.thrower,
          power: action.throwerPower,
        },
      };
    case bagActionTypes.CHANGE_FAN_POWER:
      return {
        ...state,
        displayOptions: {
          ...state.displayOptions,
          fanPower: (!state.displayOptions.fanPower),
        },
      };
    case bagActionTypes.CHANGE_PATHS:
      return {
        ...state,
        displayOptions: {
          ...state.displayOptions,
          pathsShown: action.paths,
        },
      };
    case bagActionTypes.CHANGE_LIE_DISTANCE:
      return {
        ...state,
        displayOptions: {
          ...state.displayOptions,
          lieDistance: (!state.displayOptions.lieDistance),
        },
      };
    case bagActionTypes.CHANGE_LIE_CIRCLE:
      return {
        ...state,
        displayOptions: {
          ...state.displayOptions,
          lieCircle: (!state.displayOptions.lieCircle),
        },
      };
    default:
      return state;
  }
};

export default disc;
