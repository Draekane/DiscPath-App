// External Imports
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import _ from 'lodash';
import Slider from 'react-rangeslider';

import WithHeaderAndNav from '../../hoc/withHeaderAndNav';
import FlightMap from '../../components/map/flightMap';
import DiscSelector from '../../components/similarDisc/discSelector';
import Thrower from '../../components/modals/thrower';
import DisplayOptions from '../../components/modals/displayOptions';
import DiscList from '../../components/similarDisc/discList';
// Shapes
import { companyShape, discShape } from '../../propTypeShapes/companyShapes';
import { throwerShape, displayOptionsShape } from '../../propTypeShapes/bagShapes';
// Selectors
import { currentCompaniesSelector } from '../../selector/companiesSelector';
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

import * as simDiscUtils from '../../utils/similarDiscUtils';

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
    const { dispatch, selectedDiscId, thrower } = this.props;

    dispatch(ThrowerActions.changeThrowerPower(throwerPower));
    this.handleSetSelectedDisc(selectedDiscId, { ...thrower, power: throwerPower });
  }

  handleChangeSimilarity = (similarity) => {
    const {
      dispatch,
      selectedDisc,
      companies,
      thrower,
    } = this.props;

    dispatch(SimilarDiscActions.changeSimilarity(similarity));
    if (selectedDisc) {
      const similarDiscs = simDiscUtils.getSimilarDiscs(selectedDisc, companies, thrower, similarity);
      dispatch(SimilarDiscActions.setSimilarDiscs(similarDiscs));
    }
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
    if (selectedOptions !== null) {
      this.handleSetSelectedDisc(selectedOptions.value);
    }
  }

  handleSetSelectedDisc = (selectedDisc, thrower = null) => {
    const {
      dispatch,
      companies,
      similarity,
      thrower: stateThrower,
    } = this.props;

    const selectDisc = simDiscUtils.getSelectedDisc(selectedDisc, companies, thrower || stateThrower);
    const similarDiscs = simDiscUtils.getSimilarDiscs(selectDisc, companies, thrower || stateThrower, similarity);
    dispatch(SimilarDiscActions.selectSimilarDisc(selectDisc, selectedDisc));
    dispatch(SimilarDiscActions.setSimilarDiscs(similarDiscs, true));
  }

  handleUpdateSelectedDisc = (selectDisc) => {
    const {
      dispatch,
      companies,
      similarity,
      thrower,
    } = this.props;

    const newFlightPath = simDiscUtils.getNewFlightPath(selectDisc, thrower);
    const similarDiscs = simDiscUtils.getSimilarDiscs(
      { ...selectDisc, flightPath: newFlightPath },
      companies,
      thrower,
      similarity,
    );
    dispatch(SimilarDiscActions.setSimilarDiscs(similarDiscs, true));
  }

  handleEnableSelectDisc = (enabled) => {
    const { dispatch } = this.props;
    dispatch(SimilarDiscActions.enableSelectedDisc(enabled));
  }

  handleEnableSimilarDisc = (discId, enabled) => {
    const { dispatch } = this.props;
    dispatch(SimilarDiscActions.enableSimilarDisc(discId, enabled));
  }

  handleSimilarDiscEdit = () => {
    const { dispatch } = this.props;
    dispatch(SimilarDiscActions.toggleSelectedDiscModal());
  }

  handleSimilarDiscEditWeight = (weight) => {
    const { dispatch, selectedDisc } = this.props;
    dispatch(SimilarDiscActions.editSelectDiscWeight(weight));
    const newRange = (selectedDisc.originalRange * (((selectedDisc.maxWeight - weight) * 0.005) + 1));
    this.handleUpdateSelectedDisc({ ...selectedDisc, weight, range: newRange });
  }

  handleSimilarDiscEditWear = (wear) => {
    const { dispatch, selectedDisc } = this.props;
    dispatch(SimilarDiscActions.editSelectDiscWear(wear));
    this.handleUpdateSelectedDisc({ ...selectedDisc, wear });
  }

  handleSimilarDiscEditPower = (power) => {
    const { dispatch, selectedDisc } = this.props;
    dispatch(SimilarDiscActions.editSelectDiscPower(power));
    this.handleUpdateSelectedDisc({ ...selectedDisc, power });
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
      selectedDisc,
      selectedDiscId,
      similarDiscs,
      similarDiscEditModal,
      similarity,
    } = this.props;

    const mapFunctions = {
      handleMapEnlarge: this.handleMapEnlarge,
      handleMapShrink: this.handleMapShrink,
      handleMapReset: this.handleMapReset,
    };
    const displayDiscs = _.union(similarDiscs, [{ ...selectedDisc, type: 'S' }]);

    const discListProps = {
      discs: similarDiscs,
      headerClassName: 'doesntMatter',
      title: 'Similar Disc List',
      selectedDisc,
      similarDiscEditModal,
      thrower,
      functions: {
        handleEnableSelectedDisc: this.handleEnableSelectDisc,
        handleEnableSimilarDisc: this.handleEnableSimilarDisc,
        handleSimilarDiscEdit: this.handleSimilarDiscEdit,
        handleSimilarDiscEditWeight: this.handleSimilarDiscEditWeight,
        handleSimilarDiscEditWear: this.handleSimilarDiscEditWear,
        handleSimilarDiscEditPower: this.handleSimilarDiscEditPower,
      },
    };

    const content = (
      <DocumentTitle title={pageTitle}>
        <div className="workspace-container grid-container" >
          <div className="pageTitle-header">{pageTitle}<span style={{ color: 'orange' }} > **BETA** </span></div>
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
              currentSelection={selectedDiscId}
              handleDiscSelection={this.handleDiscSelection}
            />
            Allowable Divergence: {simDiscUtils.similarityPercentage(similarity)}
            <Slider
              value={similarity}
              orientation="horizontal"
              min={0.1}
              max={0.5}
              step={0.01}
              className="similarity-slider"
              format={simDiscUtils.similarityPercentage}
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
  selectedDisc: PropTypes.shape(discShape),
  selectedDiscId: PropTypes.string,
  similarDiscs: PropTypes.arrayOf(discShape),
  similarDiscEditModal: PropTypes.bool,
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
  selectedDisc: state.similarDisc.selectedDisc,
  selectedDiscId: state.similarDisc.selectedDiscId,
  similarDiscs: state.similarDisc.similarDiscs,
  thrower: throwerSelector(state),
  displayOptions: displayOptionsSelector(state),
  discTypes: discTypesSelector(state),
  dispatch: state.dispatch,
  zoom: state.bag.zoom,
  throwerModal: state.menus.throwerModal,
  displayOptionModal: state.menus.displayOptionModal,
  similarity: state.similarDisc.similarity,
  similarDiscEditModal: state.similarDisc.similarDiscEditModal,
});

const withWrappers = _.flowRight(connect(mapStateToProps), [WithHeaderAndNav]);

export default withWrappers(SimilarDisc);
