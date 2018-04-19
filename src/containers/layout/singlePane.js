import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import _ from 'lodash';

import FlightMap from '../../components/map/flightMap';
import CompanyDiscs from '../../components/company/companyDiscs';
import Bag from '../../components/bag/bag';
import { companyShape } from '../../propTypeShapes/companyShapes';
import { discShape } from '../../propTypeShapes/bagShapes';
import * as CompanyActions from '../../actions/company';
import * as BagActions from '../../actions/bag';
import { currentCompaniesSelector, currentSelectionSelector } from '../../selector/companiesSelector';

const thrower = {
  throwType: 'rhbh',
  power: 32,
  fanPower: true,
  pathsShown: 'one',
  lieDistance: true,
  lieCircle: true,
  isRequired: {},
};

class SinglePane extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(CompanyActions.loadCompanies());
  }
  getDiscById = (discId) => {
    const { companies } = this.props;
    const discData = discId.split('-');

    if (discData.length === 2) {
      const company = _.find(companies, company => company.companyId === parseInt(discData[0], 10));
      if (company !== null) {
        const disc = _.find(company.discs, disc => disc.discId === parseInt(discData[1], 10));
        return { company, disc };
      }
    }
    return null;
  }
  handleDiscSelection = (selectedOptions) => {
    const { dispatch } = this.props;
    if (selectedOptions !== null) dispatch(CompanyActions.selectDisc(selectedOptions.value));
  }
  handleAddDiscToBag = () => {
    const { dispatch, currentSelection } = this.props;
    if (currentSelection !== null) {
      const currDisc = this.getDiscById(currentSelection);

      if (currDisc !== null) {
        const selectDisc = {
          ...currDisc.disc,
          discId: currDisc.disc.discId,
          company: currDisc.company.company,
          enabled: true,
          wear: 10,
        };

        dispatch(BagActions.loadDisc(selectDisc));
      }
    }
  }

  handleEnableDisc = (baggedDiscId, enable) => {
    const { dispatch } = this.props;

    dispatch(BagActions.setDiscEnable(baggedDiscId, enable));
  }

  handleSetDiscWear = (baggedDiscId, wear) => {
    const { dispatch } = this.props;

    dispatch(BagActions.setDiscWear(baggedDiscId, wear));
  }

  handleDiscRemove = (baggedDiscId) => {
    const { dispatch } = this.props;

    dispatch(BagActions.removeDiscFromBag(baggedDiscId));
  }

  render() {
    const {
      pageTitle, pageHeader, companies, currentSelection, currentDiscs,
    } = this.props;
    const content = (
      <DocumentTitle title={pageTitle}>
        <div className="workspace-container grid-container" >
          <header className="App-header grid-item-header">
            <h1 className="App-title">{pageHeader}</h1>
          </header>
          <div className="grid-item1">
            <FlightMap discs={currentDiscs} thrower={thrower} />
          </div>
          <div className="grid-item2">
            <Bag
              discs={currentDiscs}
              handleEnableDisc={this.handleEnableDisc}
              handleSetDiscWear={this.handleSetDiscWear}
              handleRemoveDisc={this.handleDiscRemove}
            />
            <hr />
            <CompanyDiscs
              companies={companies}
              onSelectHandler={this.handleDiscSelection}
              currentSelection={currentSelection}
            />
            <button onClick={this.handleAddDiscToBag} >Add To Bag</button>
          </div>
          <div className="grid-item3">Throw Selector Goes Here</div>
          <div className="grid-item3">Display Options Goes Here</div>
          <div className="grid-item3">Import/Export Options Go Here</div>
        </div>
      </DocumentTitle>
    );

    return content;
  }
}


SinglePane.propTypes = {
  pageTitle: PropTypes.string,
  pageHeader: PropTypes.string,
  companies: PropTypes.arrayOf(companyShape),
  currentSelection: PropTypes.string,
  currentDiscs: PropTypes.arrayOf(discShape),
  dispatch: PropTypes.func,
};

SinglePane.defaultProps = {
  pageTitle: 'DiscPath',
  pageHeader: 'Experimental Disc Golf Flight Path Visualizer',
};

const mapStateToProps = state => ({
  companies: currentCompaniesSelector(state),
  currentSelection: currentSelectionSelector(state),
  currentDiscs: state.bag.discs,
  dispatch: state.dispatch,
});

export default connect(mapStateToProps)(SinglePane);
