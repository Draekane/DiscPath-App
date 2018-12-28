import * as similarDiscActions from '../actionTypes/similarDisc';
// Models

export const changeSimilarity = similarity => ({
  type: similarDiscActions.SIMILARITY_CHANGE,
  similarity,
});

export const selectSimilarDisc = (selectedDisc, selectedDiscId) => ({
  type: similarDiscActions.SIMILAR_SELECT_DISC,
  selectedDisc,
  selectedDiscId,
});

export const setSimilarDiscs = (newSimilarDiscs, currentSimilarDiscs, reset = false) => ({
  type: similarDiscActions.SIMILAR_SET_SIMILAR_DISCS,
  newSimilarDiscs,
  currentSimilarDiscs,
  reset,
});

export const setSimilarDiscsSuccess = similarDiscs => ({
  type: similarDiscActions.SIMILAR_SET_SIMILAR_DISCS_SUCCESS,
  similarDiscs,
});

export const setSimilarDiscsFailure = error => ({
  type: similarDiscActions.SIMILAR_SET_SIMILAR_DISCS_FAILURE,
  error,
});

export const clearSimilarDiscSelection = () => ({
  type: similarDiscActions.SIMILAR_CLEAR_SELECT_DISC,
});

export const enableSelectedDisc = enabled => ({
  type: similarDiscActions.SIMILAR_ENABLE_SELECT_DISC,
  enabled,
});

export const enableSimilarDisc = (discId, enabled) => ({
  type: similarDiscActions.SIMILAR_ENABLE_SIMILAR_DISC,
  discId,
  enabled,
});

export const toggleSelectedDiscModal = () => ({
  type: similarDiscActions.SIMILAR_TOGGLE_SELECT_EDIT_MODAL,
});

export const editSelectDiscWeight = weight => ({
  type: similarDiscActions.SIMILAR_EDIT_SELECT_WEIGHT,
  weight,
});

export const editSelectDiscWear = wear => ({
  type: similarDiscActions.SIMILAR_EDIT_SELECT_WEAR,
  wear,
});

export const editSelectDiscPower = power => ({
  type: similarDiscActions.SIMILAR_EDIT_SELECT_POWER,
  power,
});
