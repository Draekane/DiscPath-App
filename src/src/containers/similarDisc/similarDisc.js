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
    const { loadCompanies } = this.props;
    loadCompanies();
  }

  handleToggleThrowerModal = () => {
    const { openThrowerModal, closeThrowerModal, throwerModal } = this.props;

    if (throwerModal) {
      closeThrowerModal();
    } else {
      openThrowerModal();
    }
  }

  handleToggleDisplayOptionModal = () => {
    const { openDisplayOptionsModal, closeDisplayOptionsModal, displayOptionModal } = this.props;

    if (displayOptionModal) {
      closeDisplayOptionsModal();
    } else {
      openDisplayOptionsModal();
    }
  }

  handleChangeThrowerPower = (throwerPower) => {
    const { changeThrowerPower, selectedDiscId, thrower } = this.props;

    changeThrowerPower(throwerPower);
    this.handleSetSelectedDisc(selectedDiscId, { ...thrower, power: throwerPower });
  }

  handleChangeSimilarity = (similarity) => {
    const {
      changeSimilarity,
      setSimilarDiscs,
      selectedDisc,
      similarDiscs,
      companies,
      thrower,
    } = this.props;

    changeSimilarity(similarity);
    if (selectedDisc) {
      const newSimilarDiscs = simDiscUtils.getSimilarDiscs(
        selectedDisc,
        companies,
        thrower,
        similarity,
        'matrix',
      );
      setSimilarDiscs(newSimilarDiscs, similarDiscs);
    }
  }

  handleDiscSelection = (selectedOptions) => {
    if (selectedOptions !== null) {
      this.handleSetSelectedDisc(selectedOptions.value);
    }
  }

  handleSetSelectedDisc = (selectedDisc, thrower = null) => {
    const {
      selectSimilarDisc,
      setSimilarDiscs,
      similarDiscs,
      companies,
      similarity,
      thrower: stateThrower,
    } = this.props;

    const selectDisc = simDiscUtils.getSelectedDisc(selectedDisc, companies, thrower || stateThrower);
    const newSimilarDiscs = simDiscUtils.getSimilarDiscs(
      selectDisc,
      companies,
      thrower || stateThrower,
      similarity,
      'matrix',
    );
    selectSimilarDisc(selectDisc, selectedDisc);
    setSimilarDiscs(newSimilarDiscs, similarDiscs, true);
  }

  handleUpdateSelectedDisc = (selectDisc) => {
    const {
      setSimilarDiscs,
      similarDiscs,
      companies,
      similarity,
      thrower,
    } = this.props;

    const newFlightPath = simDiscUtils.getNewFlightPath(selectDisc, thrower);
    const newSimilarDiscs = simDiscUtils.getSimilarDiscs(
      { ...selectDisc, flightPath: newFlightPath },
      companies,
      thrower,
      similarity,
      'matrix',
    );
    setSimilarDiscs(newSimilarDiscs, similarDiscs, true);
  }

  handleSimilarDiscEditWeight = (weight) => {
    const { editSelectDiscWeight, selectedDisc } = this.props;
    editSelectDiscWeight(weight);
    const newRange = (selectedDisc.originalRange * (((selectedDisc.maxWeight - weight) * 0.005) + 1));
    this.handleUpdateSelectedDisc({ ...selectedDisc, weight, range: newRange });
  }

  handleSimilarDiscEditWear = (wear) => {
    const { editSelectDiscWear, selectedDisc } = this.props;
    editSelectDiscWear(wear);
    this.handleUpdateSelectedDisc({ ...selectedDisc, wear });
  }

  handleSimilarDiscEditPower = (power) => {
    const { editSelectDiscPower, selectedDisc } = this.props;
    editSelectDiscPower(power);
    this.handleUpdateSelectedDisc({ ...selectedDisc, power });
  }

  render() {
    const {
      pageTitle,
      thrower,
      displayOptions,
      zoom,
      darkTheme,
      throwerModal,
      displayOptionModal,
      companies,
      selectedDisc,
      selectedDiscId,
      similarDiscs,
      similarDiscEditModal,
      similarity,
      enlargeMap,
      changeFanPower,
      changeThrowerType,
      changePaths,
      changeLieDistance,
      changeLieCircles,
      resetMap,
      shrinkMap,
      enableSelectedDisc,
      enableSimilarDisc,
      toggleSelectedDiscModal,
      setTheme,
    } = this.props;

    const mapFunctions = {
      handleMapEnlarge: enlargeMap,
      handleMapShrink: shrinkMap,
      handleMapReset: resetMap,
      handleSetTheme: setTheme,
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
        handleEnableSelectedDisc: enableSelectedDisc,
        handleEnableSimilarDisc: enableSimilarDisc,
        handleSimilarDiscEdit: toggleSelectedDiscModal,
        handleSimilarDiscEditWeight: this.handleSimilarDiscEditWeight,
        handleSimilarDiscEditWear: this.handleSimilarDiscEditWear,
        handleSimilarDiscEditPower: this.handleSimilarDiscEditPower,
      },
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
              darkTheme={darkTheme}
              functions={mapFunctions}
            />
          </div>
          <div className="grid-item2 grid-item similar-disc-table">
            <DiscSelector
              companies={companies}
              currentSelection={selectedDiscId}
              handleDiscSelection={this.handleDiscSelection}
            />
            {/* <div className="" >
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
            </div> */}
            <div className="selectedDisc_Display" >
              <DiscList props={discListProps} />
            </div>
          </div>
          <Thrower
            thrower={thrower}
            changePower={this.handleChangeThrowerPower}
            changeThrowerType={changeThrowerType}
            openModal={throwerModal}
            closeModal={this.handleToggleThrowerModal}
          />
          <DisplayOptions
            options={displayOptions}
            changeFanPower={changeFanPower}
            changePaths={changePaths}
            changeDistance={changeLieDistance}
            changeCircles={changeLieCircles}
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
  zoom: PropTypes.number,
  darkTheme: PropTypes.bool,
  throwerModal: PropTypes.bool,
  displayOptionModal: PropTypes.bool,
  similarity: PropTypes.number,
  loadCompanies: PropTypes.func,
  openThrowerModal: PropTypes.func,
  closeThrowerModal: PropTypes.func,
  openDisplayOptionsModal: PropTypes.func,
  closeDisplayOptionsModal: PropTypes.func,
  changeThrowerType: PropTypes.func,
  changeThrowerPower: PropTypes.func,
  changeSimilarity: PropTypes.func,
  setSimilarDiscs: PropTypes.func,
  changeFanPower: PropTypes.func,
  changePaths: PropTypes.func,
  changeLieDistance: PropTypes.func,
  changeLieCircles: PropTypes.func,
  enlargeMap: PropTypes.func,
  selectSimilarDisc: PropTypes.func,
  resetMap: PropTypes.func,
  shrinkMap: PropTypes.func,
  enableSelectedDisc: PropTypes.func,
  enableSimilarDisc: PropTypes.func,
  toggleSelectedDiscModal: PropTypes.func,
  editSelectDiscWeight: PropTypes.func,
  editSelectDiscWear: PropTypes.func,
  editSelectDiscPower: PropTypes.func,
  setTheme: PropTypes.func,
};

SimilarDisc.defaultProps = {
  pageTitle: 'Similar Disc',
  companies: [],
  thrower: null,
  displayOptions: null,
  zoom: 1,
  darkTheme: true,
  similarity: 0.1,
  similarDiscs: [],
};

const mapStateToProps = state => ({
  companies: currentCompaniesSelector(state),
  selectedDisc: state.similarDisc.selectedDisc,
  selectedDiscId: state.similarDisc.selectedDiscId,
  similarDiscs: state.similarDisc.similarDiscs,
  thrower: throwerSelector(state),
  displayOptions: displayOptionsSelector(state),
  discTypes: discTypesSelector(state),
  zoom: state.bag.zoom,
  darkTheme: state.bag.darkTheme,
  throwerModal: state.menus.throwerModal,
  displayOptionModal: state.menus.displayOptionModal,
  similarity: state.similarDisc.similarity,
  similarDiscEditModal: state.similarDisc.similarDiscEditModal,
});

const mapDispatchToProps = dispatch => ({
  loadCompanies: () => dispatch(CompanyActions.loadCompanies()),
  openThrowerModal: () => dispatch(MenuActions.openThrowerModal()),
  closeThrowerModal: () => dispatch(MenuActions.closeThrowerModal()),
  openDisplayOptionsModal: () => dispatch(MenuActions.openDisplayOptionsModal()),
  closeDisplayOptionsModal: () => dispatch(MenuActions.closeDisplayOptionsModal()),
  changeThrowerType: throwerType => dispatch(ThrowerActions.changeThrowerType(throwerType)),
  changeThrowerPower: throwerPower => dispatch(ThrowerActions.changeThrowerPower(throwerPower)),
  changeSimilarity: similarity => dispatch(SimilarDiscActions.changeSimilarity(similarity)),
  setSimilarDiscs: (newSimilarDiscs, currentSimilarDiscs, reset = false) =>
    dispatch(SimilarDiscActions.setSimilarDiscs(newSimilarDiscs, currentSimilarDiscs, reset)),
  changeFanPower: () => dispatch(DisplayOptionActions.changeFanPower()),
  changePaths: paths => dispatch(DisplayOptionActions.changePaths(paths)),
  changeLieDistance: () => dispatch(DisplayOptionActions.changeLieDistance()),
  changeLieCircles: () => dispatch(DisplayOptionActions.changeLieCircles()),
  enlargeMap: () => dispatch(BagActions.enlargeMap()),
  resetMap: () => dispatch(BagActions.resetMap()),
  shrinkMap: () => dispatch(BagActions.shrinkMap()),
  setTheme: darkTheme => dispatch(BagActions.setTheme(darkTheme)),
  selectSimilarDisc: (selectDisc, selectedDisc) => dispatch(SimilarDiscActions.selectSimilarDisc(selectDisc, selectedDisc)),
  enableSelectedDisc: enabled => dispatch(SimilarDiscActions.enableSelectedDisc(enabled)),
  enableSimilarDisc: (discId, enabled) => dispatch(SimilarDiscActions.enableSimilarDisc(discId, enabled)),
  toggleSelectedDiscModal: () => dispatch(SimilarDiscActions.toggleSelectedDiscModal()),
  editSelectDiscWeight: weight => dispatch(SimilarDiscActions.editSelectDiscWeight(weight)),
  editSelectDiscWear: wear => dispatch(SimilarDiscActions.editSelectDiscWear(wear)),
  editSelectDiscPower: power => dispatch(SimilarDiscActions.editSelectDiscPower(power)),
});

const withWrappers = _.flowRight(connect(mapStateToProps, mapDispatchToProps), [WithHeaderAndNav]);

export default withWrappers(SimilarDisc);
