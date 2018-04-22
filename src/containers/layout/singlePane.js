import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import _ from 'lodash';

import FlightMap from '../../components/map/flightMap';
import CompanyDiscs from '../../components/company/companyDiscs';
import Bag from '../../components/bag/bag';
import Thrower from '../../components/bag/thrower';
import DisplayOptions from '../../components/bag/displayOptions';
import { companyShape } from '../../propTypeShapes/companyShapes';
import { discShape, throwerShape, displayOptionsShape } from '../../propTypeShapes/bagShapes';
import * as CompanyActions from '../../actions/company';
import * as BagActions from '../../actions/bag';
import { currentCompaniesSelector, currentSelectionSelector } from '../../selector/companiesSelector';
import { throwerSelector, baggedDiscSelector, displayOptionsSelector, discTypesSelector } from '../../selector/bagSelector';

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

  handleEnableDiscType = (discType, enable) => {
    const { dispatch } = this.props;

    dispatch(BagActions.setDiscTypeEnable(discType, enable));
  }

  handleSetDiscWear = (baggedDiscId, wear) => {
    const { dispatch } = this.props;

    dispatch(BagActions.setDiscWear(baggedDiscId, wear));
  }

  handleDiscRemove = (baggedDiscId) => {
    const { dispatch } = this.props;

    dispatch(BagActions.removeDiscFromBag(baggedDiscId));
  }

  handleChangeThrowerType = (throwerType) => {
    const { dispatch } = this.props;

    dispatch(BagActions.changeThrowerType(throwerType));
  }

  handleChangeThrowerPower = (throwerPower) => {
    const { dispatch } = this.props;

    dispatch(BagActions.changeThrowerPower(throwerPower));
  }

  handleChangeFanPower = () => {
    const { dispatch } = this.props;

    dispatch(BagActions.changeFanPower());
  }

  handleChangePaths = (paths) => {
    const { dispatch } = this.props;

    dispatch(BagActions.changePaths(paths));
  }

  handleChangeLieDistance = () => {
    const { dispatch } = this.props;

    dispatch(BagActions.changeLieDistance());
  }

  handleChangeLieCircle = () => {
    const { dispatch } = this.props;

    dispatch(BagActions.changeLieCircles());
  }

  render() {
    const {
      pageTitle,
      pageHeader,
      companies,
      currentSelection,
      currentDiscs,
      thrower,
      displayOptions,
      discTypes,
    } = this.props;

    const bagOptions = {
      discs: currentDiscs,
      discTypes,
      functions: {
        handleEnableDisc: this.handleEnableDisc,
        handleEnableDiscType: this.handleEnableDiscType,
        handleSetDiscWear: this.handleSetDiscWear,
        handleRemoveDisc: this.handleDiscRemove,
      },
    };

    const content = (

      <DocumentTitle title={pageTitle}>
        <React.Fragment>
          <header className="App-header grid-item-header">
            <h1 className="App-title">{pageHeader}</h1>
            To report problems or offer suggestions&nbsp;
            <a
              href="https://github.com/MichaelPalmer-Orange/DiscPath-App/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="help-request"
            >click here
            </a>
          </header>
          <div className="workspace-container grid-container" >
            <div className="grid-item-credits">
              Disc flight information from&nbsp;
              <a
                href="http://www.inboundsdiscgolf.com/content/?page_id=431"
                target="_blank"
                rel="noopener noreferrer"
              >Inbounds Disc Golf InFlight Guide
              </a>
            </div>
            <div className="grid-item1 grid-item">
              <FlightMap discs={currentDiscs} thrower={thrower} displayOptions={displayOptions} />
            </div>
            <div className="grid-item2 grid-item">
              <Bag
                props={bagOptions}
                className="bag-item1"
              />
              <CompanyDiscs
                companies={companies}
                onSelectHandler={this.handleDiscSelection}
                currentSelection={currentSelection}
                className="bag-item2"
              />
              <button
                onClick={this.handleAddDiscToBag}
                className="bag-item3"
              >Add To Bag
              </button>
            </div>
            <div className="grid-item3 grid-item">
              <Thrower
                thrower={thrower}
                changePower={this.handleChangeThrowerPower}
                changeThrowerType={this.handleChangeThrowerType}
              />
            </div>
            <div className="grid-item3 grid-item">
              <DisplayOptions
                options={displayOptions}
                changeFanPower={this.handleChangeFanPower}
                changePaths={this.handleChangePaths}
                changeDistance={this.handleChangeLieDistance}
                changeCircles={this.handleChangeLieCircle}
              />
            </div>
          </div>
        </React.Fragment>
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
  thrower: PropTypes.shape(throwerShape),
  displayOptions: PropTypes.shape(displayOptionsShape),
  discTypes: PropTypes.shape({ discType: PropTypes.string, enabled: PropTypes.bool }),
  dispatch: PropTypes.func,
};

SinglePane.defaultProps = {
  pageTitle: 'DiscPath',
  pageHeader: 'Experimental Disc Golf Flight Path Visualizer',
  companies: [],
  currentSelection: null,
  currentDiscs: [],
  thrower: null,
  displayOptions: null,
  discTypes: null,
};

const mapStateToProps = state => ({
  companies: currentCompaniesSelector(state),
  currentSelection: currentSelectionSelector(state),
  currentDiscs: baggedDiscSelector(state),
  thrower: throwerSelector(state),
  displayOptions: displayOptionsSelector(state),
  discTypes: discTypesSelector(state),
  dispatch: state.dispatch,
});

export default connect(mapStateToProps)(SinglePane);
