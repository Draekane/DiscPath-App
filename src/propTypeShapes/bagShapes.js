import PropTypes from 'prop-types';

export const discShape = PropTypes.shape({
  color: PropTypes.string,
  company: PropTypes.string,
  discId: PropTypes.string,
  displayName: PropTypes.string,
  enabled: PropTypes.bool,
  hst: PropTypes.number,
  lsf: PropTypes.number,
  maxWeight: PropTypes.number,
  name: PropTypes.string,
  power: PropTypes.number,
  range: PropTypes.number,
  throwType: PropTypes.string,
  type: PropTypes.string,
  wear: PropTypes.number,
  weight: PropTypes.number,
});

export const bagShape = PropTypes.shape({
  bagId: PropTypes.number,
  discs: PropTypes.arrayOf(discShape),
  name: PropTypes.string,
});

export const throwerShape = PropTypes.shape({
  power: PropTypes.number,
  throwType: PropTypes.string,
});

export const displayOptionsShape = PropTypes.shape({
  fanPower: PropTypes.bool,
  lieCircle: PropTypes.bool,
  lieDistance: PropTypes.bool,
  pathsShown: PropTypes.string,
});
