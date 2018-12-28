import * as menuActionTypes from '../actionTypes/menus';

export const openThrowerModal = () => ({
  type: menuActionTypes.THROWER_OPEN_MODAL,
});

export const closeThrowerModal = () => ({
  type: menuActionTypes.THROWER_CLOSE_MODAL,
});

export const openDisplayOptionsModal = () => ({
  type: menuActionTypes.DISPLAY_OPTIONS_OPEN_MODAL,
});

export const closeDisplayOptionsModal = () => ({
  type: menuActionTypes.DISPLAY_OPTIONS_CLOSE_MODAL,
});

export const openImportExportModal = () => ({
  type: menuActionTypes.IMPORT_EXPORT_OPEN_MODAL,
});

export const closeImportExportModal = () => ({
  type: menuActionTypes.IMPORT_EXPORT_CLOSE_MODAL,
});
