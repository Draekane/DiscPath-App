import { all } from 'redux-saga/effects';
import bag from './bag';
import company from './company';
import similarDiscs from './similarDiscs';

export default function* () {
  yield all([
    bag(),
    company(),
    similarDiscs(),
  ]);
}
