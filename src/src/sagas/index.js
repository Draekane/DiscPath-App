import { all } from 'redux-saga/effects';
import bag from './bag';

export default function* () {
  yield all([
    bag(),
  ]);
}
