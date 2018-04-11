import PropTypes from 'prop-types';

export const discShape = PropTypes.shape({
  discId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  range: PropTypes.number,
  hst: PropTypes.number,
  lsf: PropTypes.number,
  type: PropTypes.string,
});

export const companyShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  companyId: PropTypes.number.isRequired,
  discs: PropTypes.arrayOf(discShape),
});
