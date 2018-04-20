import PropTypes from 'prop-types';

export const discShape = PropTypes.shape({
  discId: PropTypes.number,
  name: PropTypes.string,
  range: PropTypes.number,
  hst: PropTypes.number,
  lsf: PropTypes.number,
  type: PropTypes.string,
});

export const companyShape = PropTypes.shape({
  name: PropTypes.string,
  companyId: PropTypes.number,
  discs: PropTypes.arrayOf(discShape),
});
