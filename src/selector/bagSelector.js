import { createSelector } from 'reselect';
import { get, isEmpty } from 'lodash';

const getThrower = (state) => {
  const thrower = get(state, 'bag.thrower', null);

  return !isEmpty(thrower) ? thrower : null;
};

export const throwerSelector = createSelector(
  [getThrower],
  thrower => thrower,
);

const getBaggedDiscs = (state) => {
  const baggedDiscs = get(state, 'bag.discs', null);

  return !isEmpty(baggedDiscs) ? baggedDiscs : null;
};

export const baggedDiscSelector = createSelector(
  [getBaggedDiscs],
  baggedDiscs => baggedDiscs,
);

const getDisplayOptions = (state) => {
  const displayOptions = get(state, 'bag.displayOptions', null);

  return !isEmpty(displayOptions) ? displayOptions : null;
};

export const displayOptionsSelector = createSelector(
  [getDisplayOptions],
  displayOptions => displayOptions,
);
