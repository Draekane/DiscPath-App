import PropTypes from 'prop-types';

export const discShape = PropTypes.shape({
  discId: PropTypes.string,
  company: PropTypes.string,
  name: PropTypes.string,
  range: PropTypes.number,
  hst: PropTypes.number,
  lsf: PropTypes.number,
  type: PropTypes.string,
  enabled: PropTypes.bool,
  wear: PropTypes.number,
});

export const bagShape = PropTypes.shape({
  bagId: PropTypes.number,
  name: PropTypes.string,
  discs: PropTypes.arrayOf(discShape),
});

export const throwerShape = PropTypes.shape({
  throwType: PropTypes.string,
  power: PropTypes.number,
});

export const displayOptionsShape = PropTypes.shape({
  fanPower: PropTypes.bool,
  pathsShown: PropTypes.string,
  lieDistance: PropTypes.bool,
  lieCircle: PropTypes.bool,
});
