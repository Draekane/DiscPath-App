import PropTypes from 'prop-types';

export const discShape = PropTypes.shape({
  discId: PropTypes.string,
  hst: PropTypes.number,
  lsf: PropTypes.number,
  name: PropTypes.string,
  range: PropTypes.number,
  type: PropTypes.string,
  maxWeight: PropTypes.number,
});

export const companyShape = PropTypes.shape({
  companyId: PropTypes.string,
  discs: PropTypes.arrayOf(discShape),
  name: PropTypes.string,
});
