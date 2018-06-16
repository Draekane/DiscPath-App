import _ from 'lodash';
import { saveAs } from 'file-saver';
import * as bagActionTypes from '../actionTypes/bag';

const initialState = {
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
  editingDiscId: null,
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

const localStoreName = 'Discpath.CurrentState';

const getInitialState = () => {
  const savedState = localStorage.getItem(localStoreName);

  if (savedState !== null && savedState !== undefined) {
    return JSON.parse(savedState);
  }
  return initialState;
};

const saveToLocalStore = (updateState) => {
  localStorage.setItem(localStoreName, JSON.stringify(updateState));
};

const disc = (state = getInitialState(), action = {}) => {
  let thisFile;
  let newState;

  switch (action.type) {
    case bagActionTypes.ADD_DISC_TO_BAG:
      if (action.disc === null) return state;
      newState = {
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
      break;
    case bagActionTypes.UPDATE_DISC_WEAR:
      newState = {
        ...state,
        bags: state.bags.map((bag) => {
          if (bag.bagId === state.selectedBagId) {
            return {
              ...bag,
              discs: bag.discs.map((disc) => {
                if (disc.baggedDiscId === state.editingDiscId) return { ...disc, wear: action.wear };
                return disc;
              }),
            };
          } return bag;
        }),
      };
      break;
    case bagActionTypes.EDIT_DISC_WEIGHT:
      newState = {
        ...state,
        bags: state.bags.map((bag) => {
          if (bag.bagId === state.selectedBagId) {
            return {
              ...bag,
              discs: bag.discs.map((disc) => {
                if (disc.baggedDiscId === state.editingDiscId) return { ...disc, weight: action.weight };
                return disc;
              }),
            };
          } return bag;
        }),
      };
      break;
    case bagActionTypes.EDIT_DISC_POWER:
      newState = {
        ...state,
        bags: state.bags.map((bag) => {
          if (bag.bagId === state.selectedBagId) {
            return {
              ...bag,
              discs: bag.discs.map((disc) => {
                if (disc.baggedDiscId === state.editingDiscId) return { ...disc, power: action.power };
                return disc;
              }),
            };
          } return bag;
        }),
      };
      break;
    case bagActionTypes.EDIT_DISC_THROW_TYPE:
      newState = {
        ...state,
        bags: state.bags.map((bag) => {
          if (bag.bagId === state.selectedBagId) {
            return {
              ...bag,
              discs: bag.discs.map((disc) => {
                if (disc.baggedDiscId === state.editingDiscId) return { ...disc, throwType: action.throwType };
                return disc;
              }),
            };
          } return bag;
        }),
      };
      break;
    case bagActionTypes.EDIT_DISC_NAME:
      newState = {
        ...state,
        bags: state.bags.map((bag) => {
          if (bag.bagId === state.selectedBagId) {
            return {
              ...bag,
              discs: bag.discs.map((disc) => {
                if (disc.baggedDiscId === state.editingDiscId) return { ...disc, displayName: action.displayName };
                return disc;
              }),
            };
          } return bag;
        }),
      };
      break;
    case bagActionTypes.DISABLE_DISC:
    case bagActionTypes.ENABLE_DISC:
      newState = {
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
      break;
    case bagActionTypes.DISABLE_DISC_TYPE:
    case bagActionTypes.ENABLE_DISC_TYPE:
      newState = {
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
      break;
    case bagActionTypes.REMOVE_DISC_FROM_BAG:
      newState = {
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
      break;
    case bagActionTypes.CHANGE_THROWER_TYPE:
      newState = {
        ...state,
        thrower: {
          ...state.thrower,
          throwType: action.throwerType,
        },
      };
      break;
    case bagActionTypes.CHANGE_THROWER_POWER:
      newState = {
        ...state,
        thrower: {
          ...state.thrower,
          power: action.throwerPower,
        },
      };
      break;
    case bagActionTypes.CHANGE_FAN_POWER:
      newState = {
        ...state,
        displayOptions: {
          ...state.displayOptions,
          fanPower: (!state.displayOptions.fanPower),
        },
      };
      break;
    case bagActionTypes.CHANGE_PATHS:
      newState = {
        ...state,
        displayOptions: {
          ...state.displayOptions,
          pathsShown: action.paths,
        },
      };
      break;
    case bagActionTypes.CHANGE_LIE_DISTANCE:
      newState = {
        ...state,
        displayOptions: {
          ...state.displayOptions,
          lieDistance: (!state.displayOptions.lieDistance),
        },
      };
      break;
    case bagActionTypes.CHANGE_LIE_CIRCLE:
      newState = {
        ...state,
        displayOptions: {
          ...state.displayOptions,
          lieCircle: (!state.displayOptions.lieCircle),
        },
      };
      break;
    case bagActionTypes.IMPORT_BAGS_FROM_FILE:
      newState = {
        ...state,
        bags: action.fileData,
      };
      break;
    case bagActionTypes.EXPORT_BAGS_TO_FILE:
      if (state.bags.length > 0) {
        thisFile = new Blob([JSON.stringify(state.bags)], { type: 'text/plain;charset=utf-8' });
        saveAs(thisFile, 'bag.json');
      } else {
        console.log('No Bag Data to Export');
        alert('No Bag Data to Export.  Add discs to bag before exporting');
      }
      newState = state;
      break;
    case bagActionTypes.SELECT_BAG:
      newState = {
        ...state,
        selectedBagId: parseInt(action.selectBagId, 10),
      };
      break;
    case bagActionTypes.ADD_NEW_BAG_START:
      newState = {
        ...state,
        addBag: true,
        updateBag: false,
      };
      break;
    case bagActionTypes.ADD_NEW_BAG_FINISH:
      newState = {
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
      break;
    case bagActionTypes.ADD_NEW_BAG_CANCEL:
      newState = {
        ...state,
        addBag: false,
        updateBag: false,
      };
      break;
    case bagActionTypes.UPDATE_BAG_NAME_START:
      newState = {
        ...state,
        addBag: false,
        updateBag: true,
      };
      break;
    case bagActionTypes.UPDATE_BAG_NAME_FINISH:
      newState = {
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
      break;
    case bagActionTypes.UPDATE_BAG_NAME_CANCEL:
      newState = {
        ...state,
        addBag: false,
        updateBag: false,
      };
      break;
    case bagActionTypes.REMOVE_EXISTING_BAG:
      newState = {
        ...state,
        bags: _.filter(state.bags, bag => bag.bagId !== action.bagId),
      };
      break;
    case bagActionTypes.OPEN_DISC_EDIT_MODAL:
      newState = {
        ...state,
        editingDiscId: action.discId,
      };
      break;
    case bagActionTypes.CLOSE_DISC_EDIT_MODAL:
      newState = {
        ...state,
        editingDiscId: null,
      };
      break;
    default:
      newState = state;
      break;
  }

  saveToLocalStore(newState);
  return newState;
};

export default disc;
