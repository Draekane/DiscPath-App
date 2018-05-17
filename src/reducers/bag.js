import _ from 'lodash';
import { saveAs } from 'file-saver';
import * as bagActionTypes from '../actionTypes/bag';

const intiialState = {
  bags: [{
    name: 'Default Bag',
    bagId: 1,
    discs: [],
  }],
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
  lastBagId: 1,
  selectedBagId: 1,
  addBag: false,
  updateBag: false,
  discTypes: [
    {
      discType: 'D',
      enabled: true,
      title: 'Distance Drivers',
    },
    {
      discType: 'F',
      enabled: true,
      title: 'Fairway Drivers',
    },
    {
      discType: 'M',
      enabled: true,
      title: 'Midranges',
    },
    {
      discType: 'P',
      enabled: true,
      title: 'Putt and Approach',
    },
  ],
};

const disc = (state = intiialState, action = {}) => {
  let thisFile;

  switch (action.type) {
    case bagActionTypes.ADD_DISC_TO_BAG:
      if (action.disc === null) return state;
      return {
        ...state,
        bags: state.bags.map((bag) => {
          if (bag.bagId === state.selectedBagId) {
            return {
              ...bag,
              discs: [
                ...bag.discs, {
                  ...action.disc,
                  baggedDiscId: state.lastDiscId + 1,
                },
              ],
            };
          } return bag;
        }),
        lastDiscId: state.lastDiscId + 1,
      };
    case bagActionTypes.UPDATE_DISC_WEAR:
      return {
        ...state,
        bags: state.bags.map((bag) => {
          if (bag.bagId === state.selectedBagId) {
            return {
              ...bag,
              discs: bag.discs.map((disc) => {
                if (disc.baggedDiscId === action.baggedDiscId) return { ...disc, wear: action.wear };
                return disc;
              }),
            };
          } return bag;
        }),
      };
    case bagActionTypes.DISABLE_DISC:
    case bagActionTypes.ENABLE_DISC:
      return {
        ...state,
        bags: state.bags.map((bag) => {
          if (bag.bagId === state.selectedBagId) {
            return {
              ...bag,
              discs: bag.discs.map((disc) => {
                if (disc.baggedDiscId === action.baggedDiscId) {
                  return { ...disc, enabled: action.enabled };
                } return disc;
              }),
            };
          }
          return bag;
        }),
      };
    case bagActionTypes.DISABLE_DISC_TYPE:
    case bagActionTypes.ENABLE_DISC_TYPE:
      return {
        ...state,
        bags: state.bags.map(bag => ({
          ...bag,
          discs: bag.discs.map((disc) => {
            if (disc.type === action.discType) {
              return { ...disc, enabled: action.enabled };
            } return disc;
          }),
        })),
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
        bags: state.bags.map((bag) => {
          if (bag.bagId === state.selectedBagId) {
            return {
              ...bag,
              discs: _.filter(bag.discs, disc => disc.baggedDiscId !== action.baggedDiscId),
            };
          } return bag;
        }),
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
    case bagActionTypes.IMPORT_BAGS_FROM_FILE:
      return {
        ...state,
        bags: action.fileData,
      };
    case bagActionTypes.EXPORT_BAGS_TO_FILE:
      if (state.bags.length > 0) {
        thisFile = new Blob([JSON.stringify(state.bags)], { type: 'text/plain;charset=utf-8' });
        saveAs(thisFile, 'bag.json');
      } else {
        console.log('No Bag Data to Export');
        alert('No Bag Data to Export.  Add discs to bag before exporting');
      }
      return state;
    case bagActionTypes.SELECT_BAG:
      return {
        ...state,
        selectedBagId: action.selectBagId,
      };
    case bagActionTypes.ADD_NEW_BAG_START:
      return {
        ...state,
        addBag: true,
        updateBag: false,
      };
    case bagActionTypes.ADD_NEW_BAG_FINISH:
      return {
        ...state,
        addBag: false,
        updateBag: false,
        selectedBagId: state.lastBagId + 1,
        bags: [
          ...state.bags,
          {
            name: action.bagName,
            bagId: state.lastBagId + 1,
            discs: [],
          },
        ],
        lastBagId: state.lastBagId + 1,
      };
    case bagActionTypes.ADD_NEW_BAG_CANCEL:
      return {
        ...state,
        addBag: false,
        updateBag: false,
      };
    case bagActionTypes.UPDATE_BAG_NAME_START:
      return {
        ...state,
        addBag: false,
        updateBag: true,
      };
    case bagActionTypes.UPDATE_BAG_NAME_FINISH:
      return {
        ...state,
        addBag: false,
        updateBag: false,
        bags: state.bags.map((bag) => {
          if (bag.bagId === state.selectedBagId) {
            return {
              ...bag,
              name: action.bagName,
            };
          } return bag;
        }),
      };
    case bagActionTypes.UPDATE_BAG_NAME_CANCEL:
      return {
        ...state,
        addBag: false,
        updateBag: false,
      };
    case bagActionTypes.REMOVE_EXISTING_BAG:
      return {
        ...state,
        bags: _.filter(state.bags, bag => bag.bagId !== action.bagId),
      };
    default:
      return state;
  }
};

export default disc;
