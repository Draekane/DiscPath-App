import { createSelector } from 'reselect';
import { get, isEmpty } from 'lodash';

const getDisplayOptions = (state) => {
  const displayOptions = get(state, 'displayOptions', null);

  return !isEmpty(displayOptions) ? displayOptions : null;
};

export const displayOptionsSelector = createSelector(
  [getDisplayOptions],
  displayOptions => displayOptions,
);

