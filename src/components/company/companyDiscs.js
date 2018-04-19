import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import Select from 'react-select';

import { companyShape } from '../../propTypeShapes/companyShapes';

const CompanyDiscs = ({ companies, currentSelection, onSelectHandler }) => {
  const createCompanyDiscSelections = () => {
    const newOptions = [];
    _.forEach(companies, (company) => {
      _.forEach(company.discs, (disc) => {
        newOptions.push({ label: `${company.company} ${disc.name}`, value: `${company.companyId}-${disc.discId}` });
      });
    });

    return newOptions;
  };
  const displaySuggestions = createCompanyDiscSelections();
  const selectDisplay = (<Select
    name="CompanyDiscSelector"
    id="CompanyDiscSelector"
    options={displaySuggestions}
    value={currentSelection}
    onChange={onSelectHandler}
    autosize={false}
  />);

  return (
    <div>
      {selectDisplay}
    </div>
  );
};

CompanyDiscs.propTypes = {
  companies: PropTypes.arrayOf(companyShape),
  currentSelection: PropTypes.string,
  onSelectHandler: PropTypes.func,
};

export default CompanyDiscs;
