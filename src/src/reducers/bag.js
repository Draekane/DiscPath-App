import _ from 'lodash';
import * as bagActionTypes from '../actionTypes/bag';
import { discTypes } from '../utils/discTypeConsts';

const initialBag = {
  name: 'Default Bag',
  bagId: -1,
  discs: [],
};

const initialState = {
  bags: [{
    ...initialBag,
    bagId: 1,
  }],
  zoom: 1,
  darkTheme: true,
  lastBagId: 1,
  selectedBagId: 1,
  editingDiscId: null,
  addBag: false,
  updateBag: false,
  discTypes,
  ranUpdateCheck: false,
};

const localStoreName = 'Discpath.CurrentState';

const getInitialState = () => {
  let newState = initialState;
  const savedState = localStorage.getItem(localStoreName);
  if (savedState !== null && savedState !== undefined) {
    newState = { ...JSON.parse(savedState), ranUpdateCheck: false };
  }
  return newState;
};

const saveToLocalStore = (updateState) => {
  localStorage.setItem(localStoreName, JSON.stringify(updateState));
};

const bag = (state = getInitialState(), action = {}) => {
  let newState;
  let newBag;

  switch (action.type) {
    case bagActionTypes.ADD_DISC_TO_BAG_SUCCESS:
    case bagActionTypes.UPDATE_DISC_WEAR_SUCCESS:
    case bagActionTypes.EDIT_DISC_WEIGHT_SUCCESS:
    case bagActionTypes.EDIT_DISC_POWER_SUCCESS:
    case bagActionTypes.EDIT_DISC_THROW_TYPE_SUCCESS:
    case bagActionTypes.EDIT_DISC_NAME_SUCCESS:
    case bagActionTypes.EDIT_DISC_ENABLED_SUCCESS:
    case bagActionTypes.REMOVE_DISC_FROM_BAG_SUCCESS:
    case bagActionTypes.EDIT_BAG_NAME_SUCCESS:
      if (action.bag === null) return state;
      newState = {
        ...state,
        bags: state.bags.map((bag) => {
          if (bag.bagId === action.bag.bagId) {
            return action.bag;
          } return bag;
        }),
      };
      break;
    case bagActionTypes.ADD_NEW_BAG_SUCCESS:
      if (action.bags === null) return state;
      newState = {
        ...state,
        bags: action.bags,
      };
      break;
    case bagActionTypes.EDIT_DISC_TYPE_ENABLED_SUCCESS:
      if (action.bag === null) return state;
      newState = {
        ...state,
        bags: state.bags.map((bag) => {
          if (bag.bagId === action.bag.bagId) {
            return action.bag;
          } return bag;
        }),
        discTypes: state.discTypes.map((discType) => {
          if (discType.discType === action.discType.discType) {
            return action.discType;
          }
          return discType;
        }),
      };
      break;
    case bagActionTypes.IMPORT_BAGS_FROM_FILE:
      newState = {
        ...state,
        bags: action.fileData,
      };
      break;
    case bagActionTypes.SELECT_BAG_SUCCESS:
      newState = {
        ...state,
        selectedBagId: _.some(state.bags, bag => bag.bagId === action.newBagId) ? action.newBagId : state.selectedBagId,
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
      };
      break;
    case bagActionTypes.UPDATE_BAG_NAME_CANCEL:
      newState = {
        ...state,
        addBag: false,
        updateBag: false,
      };
      break;
    case bagActionTypes.REMOVE_EXISTING_BAG_SUCCESS:
      newState = {
        ...state,
        bags: action.bags,
        selectedBagId: action.bags.length >= 1 ? action.bags[0].bagId : 1,
      };
      break;
    case bagActionTypes.OPEN_DISC_EDIT_MODAL:
      newBag = _.find(state.bags, bag => bag.bagId === state.selectedBagId);
      newState = {
        ...state,
        editingDiscId: _.some(newBag.discs, disc => disc.baggedDiscId === action.discId) ? action.discId : null,
      };
      break;
    case bagActionTypes.CLOSE_DISC_EDIT_MODAL:
      newState = {
        ...state,
        editingDiscId: null,
      };
      break;
    case bagActionTypes.ENLARG_MAP:
      newState = {
        ...state,
        zoom: (state.zoom + 0.2) <= 2 ? (state.zoom + 0.2) : state.zoom,
      };
      break;
    case bagActionTypes.SHRINK_MAP:
      newState = {
        ...state,
        zoom: (state.zoom - 0.2) >= 0.6 ? (state.zoom - 0.2) : state.zoom,
      };
      break;
    case bagActionTypes.RESET_MAP:
      newState = {
        ...state,
        zoom: 1,
      };
      break;
    case bagActionTypes.CHECK_BAG_FOR_UPDATES_SUCCESS:
      newState = {
        ...action.updateBag,
        ranUpdateCheck: true,
      };
      break;
    case bagActionTypes.SET_MAP_THEME:
      newState = {
        ...state,
        darkTheme: action.darkTheme,
      };
      break;
    default:
      newState = state;
      break;
  }

  saveToLocalStore(newState);
  return newState;
};

export default bag;
