import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import Select from 'react-select';
import { FaThumbsUp } from 'react-icons/lib/fa';
import PDGA from '../../img/pdga.png';

import { companyShape } from '../../propTypeShapes/companyShapes';

const CompanyDiscs = ({ companies, currentSelection, onSelectHandler }) => {
  const createCompanyDiscSelections = () => {
    const newOptions = [];
    _.forEach(companies, (company) => {
      _.forEach(company.discs, (disc) => {
        newOptions.push({
          label: `${company.company} ${disc.name}`,
          value: `${company.companyId}-${disc.discId}`,
          isPdga: (disc.pdga === 'Y'),
        });
      });
    });

    return newOptions;
  };

  const renderOption = (option) => {
    const { isPdga, label } = option;
    return renderOptionItem(isPdga, label);
  };

  const renderSelected = (option) => {
    const { isPdga, label } = option.value;
    return renderOptionItem(isPdga, label);
  };

  const renderOptionItem = (isPdga, label) => {
    let pdgaImg = null;
    if (isPdga) pdgaImg = (<img className="pdgaApproval" alt="PDGA Approved" src={PDGA} />);

    return <div className="Select-value" >{label}{pdgaImg}</div>;
  };

  const displaySuggestions = createCompanyDiscSelections();
  const selectDisplay = (<Select
    name="CompanyDiscSelector"
    id="CompanyDiscSelector"
    options={displaySuggestions}
    optionRenderer={renderOption}
    valueComponent={renderSelected}
    value={currentSelection}
    onChange={onSelectHandler}
    autosize={false}
    placeholder="Start Typing to Filter and Select Disc..."
    openOnFocus
  />);

  return selectDisplay;
};

CompanyDiscs.propTypes = {
  companies: PropTypes.arrayOf(companyShape),
  currentSelection: PropTypes.string,
  onSelectHandler: PropTypes.func,
};

export default CompanyDiscs;
