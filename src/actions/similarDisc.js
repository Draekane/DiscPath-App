import * as similarDiscActions from '../actionTypes/similarDisc';

export const changeSimilarity = similarity => ({
  type: similarDiscActions.SIMILARITY_CHANGE,
  similarity,
});
