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

export const setSimilarDiscs = similarDiscs => ({
  type: similarDiscActions.SIMILAR_SET_SIMILAR_DISCS,
  similarDiscs,
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
