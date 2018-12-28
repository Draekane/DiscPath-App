import { put, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';
import * as actions from '../actions/similarDisc';
import * as actionTypes from '../actionTypes/similarDisc';

export function* similarDiscsSaga({ newSimilarDiscs, currentSimilarDiscs, reset }) {
  if (!newSimilarDiscs) yield put(actions.setSimilarDiscsFailure('No New Similar Discs'));
  if (reset) yield put(actions.setSimilarDiscsSuccess(newSimilarDiscs));
  const similarDiscs = (currentSimilarDiscs.length < newSimilarDiscs.length) ?
    _.unionBy(currentSimilarDiscs, newSimilarDiscs, disc => disc.discId) :
    _.intersectionBy(currentSimilarDiscs, newSimilarDiscs, disc => disc.discId);
  yield put(actions.setSimilarDiscsSuccess(similarDiscs));
}

export default function* () {
  yield takeEvery(actionTypes.SIMILAR_SET_SIMILAR_DISCS, similarDiscsSaga);
}
