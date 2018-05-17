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

const getBags = (state) => {
  const bags = get(state, 'bag.bags', null);

  return !isEmpty(bags) ? bags : null;
}

export const bagSelector = createSelector(
  [getBags],
  bags => bags,
);

const getDisplayOptions = (state) => {
  const displayOptions = get(state, 'bag.displayOptions', null);

  return !isEmpty(displayOptions) ? displayOptions : null;
};

export const displayOptionsSelector = createSelector(
  [getDisplayOptions],
  displayOptions => displayOptions,
);

const getDiscTypes = (state) => {
  const discTypes = get(state, 'bag.discTypes', null);

  return !isEmpty(discTypes) ? discTypes : null;
};

export const discTypesSelector = createSelector(
  [getDiscTypes],
  discTypes => discTypes,
);
