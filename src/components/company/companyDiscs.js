import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';
import Select from 'react-select';

import { companyShape } from '../../propTypeShapes/companyShapes';

class CompanyDiscs extends Component {
  createCompanyDiscSelections = () => {
    const { companies } = this.props;
    const newOptions = [];
    _.forEach(companies, (company) => {
      _.forEach(company.discs, (disc) => {
        newOptions.push({ label: `${company.name} ${disc.name}`, value: `${company.companyId}-${disc.discId}` });
      });
    });

    return newOptions;
  };

  render() {
    const displaySuggestions = this.createCompanyDiscSelections();
    const selectDisplay = (<Select
      name="CompanyDiscSelector"
      id="CompanyDiscSelector"
      options={displaySuggestions}
      onChange={this.onSuggestionSelected}
      autosize={false}
    />);

    return (
      <div>
        {selectDisplay}
      </div>
    );
  }
}

CompanyDiscs.propTypes = {
  companies: PropTypes.shape(companyShape),
};

export default CompanyDiscs;
