import * as menuActionTypes from '../actionTypes/menus';

const initialState = {
  throwerModal: false,
  displayOptionModal: false,
  importExportModal: false,
};

const menus = (state = initialState, action = {}) => {
  switch (action.type) {
    case menuActionTypes.THROWER_OPEN_MODAL:
    case menuActionTypes.THROWER_CLOSE_MODAL:
      return {
        ...state,
        throwerModal: action.type === menuActionTypes.THROWER_OPEN_MODAL,
        displayOptionModal: false,
        importExportModal: false,
      };
    case menuActionTypes.DISPLAY_OPTIONS_OPEN_MODAL:
    case menuActionTypes.DISPLAY_OPTIONS_CLOSE_MODAL:
      return {
        ...state,
        throwerModal: false,
        displayOptionModal: action.type === menuActionTypes.DISPLAY_OPTIONS_OPEN_MODAL,
        importExportModal: false,
      };
    case menuActionTypes.IMPORT_EXPORT_OPEN_MODAL:
    case menuActionTypes.IMPORT_EXPORT_CLOSE_MODAL:
      return {
        ...state,
        throwerModal: false,
        displayOptionModal: false,
        importExportModal: action.type === menuActionTypes.IMPORT_EXPORT_OPEN_MODAL,
      };
    default:
      return state;
  }
};

export default menus;
