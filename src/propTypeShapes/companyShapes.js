import PropTypes from 'prop-types';

export const discShape = PropTypes.shape({
  discId: PropTypes.string,
  name: PropTypes.string,
  range: PropTypes.number,
  hst: PropTypes.number,
  lsf: PropTypes.number,
  type: PropTypes.string,
});

export const companyShape = PropTypes.shape({
  name: PropTypes.string,
  companyId: PropTypes.string,
  discs: PropTypes.arrayOf(discShape),
});
