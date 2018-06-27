// External Imports
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import _ from 'lodash';
import Slider from 'react-rangeslider';

import WithHeaderAndNav from '../../components/layout/withHeaderAndNav';
import FlightMap from '../../components/map/flightMap';
import DiscSelector from '../../components/similarDisc/discSelector';
import Thrower from '../../components/menus/thrower';
import DisplayOptions from '../../components/menus/displayOptions';
import DiscList from '../../components/similarDisc/discList';
// Shapes
import { companyShape } from '../../propTypeShapes/companyShapes';
import { throwerShape, displayOptionsShape } from '../../propTypeShapes/bagShapes';
// Selectors
import { currentCompaniesSelector, currentSelectionSelector } from '../../selector/companiesSelector';
import { discTypesSelector } from '../../selector/bagSelector';
import { displayOptionsSelector } from '../../selector/displayOptionsSelector';
import { throwerSelector } from '../../selector/throwerSelector';
// Actions
import * as BagActions from '../../actions/bag';
import * as CompanyActions from '../../actions/company';
import * as MenuActions from '../../actions/menus';
import * as ThrowerActions from '../../actions/thrower';
import * as DisplayOptionActions from '../../actions/displayOptions';
import * as SimilarDiscActions from '../../actions/similarDisc';
// Models
import Disc from '../../models/disc';

import { similarityPercentage } from '../../utils/similarDiscUtils';

class SimilarDisc extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(CompanyActions.loadCompanies());
  }

  handleToggleThrowerModal = () => {
    const { dispatch, throwerModal } = this.props;

    if (throwerModal) {
      dispatch(MenuActions.closerThrowerModal());
    } else {
      dispatch(MenuActions.openThrowerModal());
    }
  }

  handleToggleDisplayOptionModal = () => {
    const { dispatch, displayOptionModal } = this.props;

    if (displayOptionModal) {
      dispatch(MenuActions.closeDisplayOptionsModal());
    } else {
      dispatch(MenuActions.openDisplayOptionsModal());
    }
  }

  handleChangeThrowerType = (throwerType) => {
    const { dispatch } = this.props;

    dispatch(ThrowerActions.changeThrowerType(throwerType));
  }

  handleChangeThrowerPower = (throwerPower) => {
    const { dispatch } = this.props;

    dispatch(ThrowerActions.changeThrowerPower(throwerPower));
  }

  handleChangeSimilarity = (similarity) => {
    const { dispatch } = this.props;
    dispatch(SimilarDiscActions.changeSimilarity(similarity));
  }

  handleChangeFanPower = () => {
    const { dispatch } = this.props;

    dispatch(DisplayOptionActions.changeFanPower());
  }

  handleChangePaths = (paths) => {
    const { dispatch } = this.props;

    dispatch(DisplayOptionActions.changePaths(paths));
  }

  handleChangeLieDistance = () => {
    const { dispatch } = this.props;

    dispatch(DisplayOptionActions.changeLieDistance());
  }

  handleChangeLieCircle = () => {
    const { dispatch } = this.props;

    dispatch(DisplayOptionActions.changeLieCircles());
  }

  handleMapEnlarge = () => {
    const { dispatch } = this.props;

    dispatch(BagActions.enlargeMap());
  }

  handleMapShrink = () => {
    const { dispatch } = this.props;

    dispatch(BagActions.shrinkMap());
  }

  handleMapReset = () => {
    const { dispatch } = this.props;

    dispatch(BagActions.resetMap());
  }

  handleDiscSelection = (selectedOptions) => {
    const { dispatch } = this.props;
    if (selectedOptions !== null) dispatch(CompanyActions.selectDisc(selectedOptions.value));
  }

  render() {
    const {
      pageTitle,
      thrower,
      displayOptions,
      zoom,
      throwerModal,
      displayOptionModal,
      companies,
      currentSelection,
      similarity,
    } = this.props;

    const mapFunctions = {
      handleMapEnlarge: this.handleMapEnlarge,
      handleMapShrink: this.handleMapShrink,
      handleMapReset: this.handleMapReset,
    };

    const getSelectedDisc = () => {
      let foundDisc = null;
      if (!currentSelection) return foundDisc;
      const currentParse = currentSelection.split('-');
      _.forEach(companies, (company) => {
        if (company.companyId === currentParse[0]) {
          _.forEach(company.discs, (disc) => {
            if (disc.discId === currentParse[1]) {
              foundDisc = new Disc({ ...disc, company: company.company });
            }
          });
        }
      });

      return foundDisc;
    };

    const getSimilarDiscs = (selectedDisc) => {
      if (!selectedDisc) return [];
      const percent = similarity;
      const checkParams = {
        hstA: selectedDisc.hst - (selectedDisc.hst * percent),
        hstB: selectedDisc.hst + (selectedDisc.hst * percent),
        lsfA: selectedDisc.lsf - (selectedDisc.lsf * percent),
        lsfB: selectedDisc.lsf + (selectedDisc.lsf * percent),
        rangeA: selectedDisc.range - (100 * percent),
        rangeB: selectedDisc.range + (100 * percent),
      };

      const similarDiscs = [];
      _.forEach(companies, (company) => {
        _.forEach(company.discs, (disc) => {
          const convertDisc = new Disc({ ...disc, company: company.company });
          if (convertDisc.isDiscSimilar(checkParams)) similarDiscs.push(convertDisc);
        });
      });

      return similarDiscs;
    };

    const getDisplayDiscs = () => {
      const selectedDisc = getSelectedDisc();

      if (!selectedDisc) return [];

      const similarDiscs = getSimilarDiscs(selectedDisc);

      return _.union([selectedDisc], similarDiscs);
    };

    const displayDiscs = getDisplayDiscs();

    const discListProps = {
      discs: getSimilarDiscs(getSelectedDisc()),
      headerClassName: 'doesntMatter',
      title: 'Similar Disc List',
    };

    const content = (
      <DocumentTitle title={pageTitle}>
        <div className="workspace-container grid-container" >
          <div className="pageTitle-header">{pageTitle}</div>
          <div className="grid-item-menu" >
            <button onClick={this.handleToggleThrowerModal} >Thrower</button>
            <button onClick={this.handleToggleDisplayOptionModal}>Display Options</button>
          </div>
          <div className="grid-item1 grid-item">
            <FlightMap
              id="similarDiscMap"
              discs={displayDiscs}
              thrower={thrower}
              displayOptions={displayOptions}
              zoom={zoom}
              functions={mapFunctions}
            />
          </div>
          <div className="grid-item2 grid-item similar-disc-table">
            <DiscSelector
              companies={companies}
              currentSelection={currentSelection}
              handleDiscSelection={this.handleDiscSelection}
            />
            Allowable Divergence: {similarityPercentage(similarity)}
            <Slider
              value={similarity}
              orientation="horizontal"
              min={0.1}
              max={1.0}
              step={0.1}
              className="similarity-slider"
              format={similarityPercentage}
              onChange={this.handleChangeSimilarity}
            />
            <div className="selectedDisc_Display" >
              <DiscList props={discListProps} />
            </div>
          </div>
          <Thrower
            thrower={thrower}
            changePower={this.handleChangeThrowerPower}
            changeThrowerType={this.handleChangeThrowerType}
            openModal={throwerModal}
            closeModal={this.handleToggleThrowerModal}
          />
          <DisplayOptions
            options={displayOptions}
            changeFanPower={this.handleChangeFanPower}
            changePaths={this.handleChangePaths}
            changeDistance={this.handleChangeLieDistance}
            changeCircles={this.handleChangeLieCircle}
            openModal={displayOptionModal}
            closeModal={this.handleToggleDisplayOptionModal}
          />
        </div>
      </DocumentTitle>
    );

    return content;
  }
}


SimilarDisc.propTypes = {
  pageTitle: PropTypes.string,
  companies: PropTypes.arrayOf(companyShape),
  currentSelection: PropTypes.string,
  thrower: PropTypes.shape(throwerShape),
  displayOptions: PropTypes.shape(displayOptionsShape),
  dispatch: PropTypes.func,
  zoom: PropTypes.number,
  throwerModal: PropTypes.bool,
  displayOptionModal: PropTypes.bool,
  similarity: PropTypes.number,
};

SimilarDisc.defaultProps = {
  pageTitle: 'Similar Disc',
  companies: [],
  thrower: null,
  displayOptions: null,
  zoom: 1,
  similarity: 0.1,
};

const mapStateToProps = state => ({
  companies: currentCompaniesSelector(state),
  currentSelection: currentSelectionSelector(state),
  thrower: throwerSelector(state),
  displayOptions: displayOptionsSelector(state),
  discTypes: discTypesSelector(state),
  dispatch: state.dispatch,
  zoom: state.bag.zoom,
  throwerModal: state.menus.throwerModal,
  displayOptionModal: state.menus.displayOptionModal,
  similarity: state.similarDisc.similarity,
});

const withWrappers = _.flowRight(connect(mapStateToProps), [WithHeaderAndNav]);

export default withWrappers(SimilarDisc);
