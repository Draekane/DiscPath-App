import PropTypes from 'prop-types';
import React from 'react';

import CompanyDiscs from '../company/companyDiscs';
// Shapes
import { companyShape } from '../../propTypeShapes/companyShapes';


const DiscSelector = (props) => {
  const { companies, currentSelection, handleDiscSelection } = props;
  return (
    <CompanyDiscs
      companies={companies}
      onSelectHandler={handleDiscSelection}
      currentSelection={currentSelection}
      className="bag-item2"
    />
  );
};

DiscSelector.propTypes = {
  companies: PropTypes.arrayOf(companyShape),
  currentSelection: PropTypes.string,
  handleDiscSelection: PropTypes.func,
};

export default DiscSelector;
