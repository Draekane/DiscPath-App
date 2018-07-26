import { createSelector } from 'reselect';
import { get, isEmpty } from 'lodash';

const getThrower = (state) => {
  const thrower = get(state, 'thrower', null);

  return !isEmpty(thrower) ? thrower : null;
};

export const throwerSelector = createSelector(
  [getThrower],
  thrower => thrower,
);
