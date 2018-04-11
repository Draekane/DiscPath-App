import PropTypes from 'prop-types';

export const discShape = PropTypes.shape({
  discId: PropTypes.number,
  company: PropTypes.string,
  name: PropTypes.string,
  range: PropTypes.number,
  hst: PropTypes.number,
  lsf: PropTypes.number,
  type: PropTypes.string,
  enabled: PropTypes.bool,
  wear: PropTypes.number,
});

export const throwerShape = PropTypes.shape({
  throwType: PropTypes.string,
  power: PropTypes.number,
  fanPower: PropTypes.bool,
  pathsShown: PropTypes.string,
  lieDistance: PropTypes.bool,
  lieCircle: PropTypes.bool,
});
