// External Imports
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import _ from 'lodash';
// Internal Imports
import FlightMap from '../../components/map/flightMap';
import BagContainer from './bag';
import Thrower from '../../components/modals/thrower';
import DisplayOptions from '../../components/modals/displayOptions';
import ImportExport from '../../components/modals/importExport';
import WithHeaderAndNav from '../../hoc/withHeaderAndNav';
// Shapes
import { companyShape } from '../../propTypeShapes/companyShapes';
import { throwerShape, displayOptionsShape, bagShape } from '../../propTypeShapes/bagShapes';
// Actions
import * as BagActions from '../../actions/bag';
import * as CompanyActions from '../../actions/company';
import * as DisplayOptionActions from '../../actions/displayOptions';
import * as MenuActions from '../../actions/menus';
import * as ThrowerActions from '../../actions/thrower';
// Selectors
import { currentCompaniesSelector, currentSelectionSelector } from '../../selector/companiesSelector';
import { discTypesSelector } from '../../selector/bagSelector';
import { displayOptionsSelector } from '../../selector/displayOptionsSelector';
import { throwerSelector } from '../../selector/throwerSelector';

class BagSetup extends Component {
  componentWillMount() {
    const { loadCompanies } = this.props;
    loadCompanies();
  }

  componentWillReceiveProps = (newProps) => {
    const { checkBagForUpdates } = this.props;
    const { companies, bag } = newProps;

    if (companies && bag && !bag.ranUpdateCheck) checkBagForUpdates(companies, bag);
  }

  getDiscById = (discId) => {
    const { companies } = this.props;
    const discData = discId.split('-');

    if (discData.length === 2) {
      const company = _.find(companies, c => c.companyId === discData[0]);
      if (company !== null) {
        const disc = _.find(company.discs, d => d.discId === discData[1]);
        return { company, disc };
      }
    }
    return null;
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

  handleToggleImportExportModal = () => {
    const { openImportExportModal, closeImportExportModal, importExportModal } = this.props;

    if (importExportModal) {
      closeImportExportModal();
    } else {
      openImportExportModal();
    }
  }

  render() {
    const {
      pageTitle,
      thrower,
      displayOptions,
      bag,
      selectedBagId,
      zoom,
      throwerModal,
      displayOptionModal,
      importExportModal,
      darkTheme,
      changeThrowerType,
      changeThrowerPower,
      changeFanPower,
      changePaths,
      changeLieDistance,
      changeLieCircles,
      exportBagsToFile,
      importBagsFromFile,
      enlargeMap,
      shrinkMap,
      resetMap,
      setTheme,
    } = this.props;

    const currentBag = _.filter(bag.bags, bg => bg.bagId === parseInt(selectedBagId, 10))[0];

    const mapFunctions = {
      handleMapEnlarge: enlargeMap,
      handleMapShrink: shrinkMap,
      handleMapReset: resetMap,
      handleSetTheme: setTheme,
    };

    const content = (
      <DocumentTitle title={`DiscPath: ${pageTitle}`} >
        <div className="workspace-container grid-container" >
          <div className="pageTitle-header">{pageTitle}</div>
          <div className="grid-item-menu" >
            <button onClick={this.handleToggleThrowerModal} >Thrower</button>
            <button onClick={this.handleToggleDisplayOptionModal}>Display Options</button>
            <button onClick={this.handleToggleImportExportModal}>Import/Export</button>
          </div>
          <div className="grid-item1 grid-item">
            <FlightMap
              id="discSetupMap"
              discs={currentBag.discs}
              thrower={thrower}
              displayOptions={displayOptions}
              zoom={zoom}
              darkTheme={darkTheme}
              functions={mapFunctions}
            />
          </div>
          <div className="grid-item2 grid-item">
            <BagContainer state />
          </div>
          <Thrower
            thrower={thrower}
            changePower={changeThrowerPower}
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
          <ImportExport
            importFunction={importBagsFromFile}
            exportFunction={exportBagsToFile}
            openModal={importExportModal}
            closeModal={this.handleToggleImportExportModal}
          />
        </div>
      </DocumentTitle>
    );

    return content;
  }
}


BagSetup.propTypes = {
  pageTitle: PropTypes.string,
  companies: PropTypes.arrayOf(companyShape),
  bag: PropTypes.shape({
    bags: PropTypes.arrayOf(bagShape),
    zoom: PropTypes.number,
    lastDiscId: PropTypes.number,
    lastBagId: PropTypes.number,
    selectedBagId: PropTypes.number,
    editingDiscId: PropTypes.string,
    addBag: PropTypes.bool,
    updateBag: PropTypes.bool,
    discTypes: PropTypes.arrayOf(PropTypes.shape({
      discType: PropTypes.string,
      enabled: PropTypes.bool,
      title: PropTypes.string,
    })),
    ranUpdateCheck: PropTypes.bool,
  }),
  thrower: PropTypes.shape(throwerShape),
  displayOptions: PropTypes.shape(displayOptionsShape),
  selectedBagId: PropTypes.number,
  zoom: PropTypes.number,
  darkTheme: PropTypes.bool,
  throwerModal: PropTypes.bool,
  displayOptionModal: PropTypes.bool,
  importExportModal: PropTypes.bool,
  loadCompanies: PropTypes.func,
  checkBagForUpdates: PropTypes.func,
  openThrowerModal: PropTypes.func,
  closeThrowerModal: PropTypes.func,
  openDisplayOptionsModal: PropTypes.func,
  closeDisplayOptionsModal: PropTypes.func,
  openImportExportModal: PropTypes.func,
  closeImportExportModal: PropTypes.func,
  changeThrowerType: PropTypes.func,
  changeThrowerPower: PropTypes.func,
  changeFanPower: PropTypes.func,
  changePaths: PropTypes.func,
  changeLieDistance: PropTypes.func,
  changeLieCircles: PropTypes.func,
  exportBagsToFile: PropTypes.func,
  importBagsFromFile: PropTypes.func,
  enlargeMap: PropTypes.func,
  shrinkMap: PropTypes.func,
  resetMap: PropTypes.func,
  setTheme: PropTypes.func,
};

BagSetup.defaultProps = {
  pageTitle: 'Bag Setup',
  companies: [],
  bag: {},
  thrower: null,
  displayOptions: null,
  selectedBagId: 1,
  zoom: 1,
  darkTheme: true,
};

const mapStateToProps = state => ({
  companies: currentCompaniesSelector(state),
  currentSelection: currentSelectionSelector(state),
  bag: state.bag,
  thrower: throwerSelector(state),
  displayOptions: displayOptionsSelector(state),
  discTypes: discTypesSelector(state),
  selectedBagId: state.bag.selectedBagId,
  addBag: state.bag.addBag,
  updateBag: state.bag.updateBag,
  zoom: state.bag.zoom,
  darkTheme: state.bag.darkTheme,
  throwerModal: state.menus.throwerModal,
  displayOptionModal: state.menus.displayOptionModal,
  importExportModal: state.menus.importExportModal,
});

const mapDispatchToProps = dispatch => ({
  loadCompanies: () => dispatch(CompanyActions.loadCompanies()),
  checkBagForUpdates: (companies, bag) => dispatch(BagActions.checkBagForUpdates(companies, bag)),
  openThrowerModal: () => dispatch(MenuActions.openThrowerModal()),
  closeThrowerModal: () => dispatch(MenuActions.closeThrowerModal()),
  openDisplayOptionsModal: () => dispatch(MenuActions.openDisplayOptionsModal()),
  closeDisplayOptionsModal: () => dispatch(MenuActions.closeDisplayOptionsModal()),
  openImportExportModal: () => dispatch(MenuActions.openImportExportModal()),
  closeImportExportModal: () => dispatch(MenuActions.closeImportExportModal()),
  changeThrowerType: throwerType => dispatch(ThrowerActions.changeThrowerType(throwerType)),
  changeThrowerPower: throwerPower => dispatch(ThrowerActions.changeThrowerPower(throwerPower)),
  changeFanPower: () => dispatch(DisplayOptionActions.changeFanPower()),
  changePaths: paths => dispatch(DisplayOptionActions.changePaths(paths)),
  changeLieDistance: () => dispatch(DisplayOptionActions.changeLieDistance()),
  changeLieCircles: () => dispatch(DisplayOptionActions.changeLieCircles()),
  exportBagsToFile: () => dispatch(BagActions.exportBagsToFile()),
  importBagsFromFile: file => dispatch(BagActions.importBagsFromFile(file)),
  enlargeMap: () => dispatch(BagActions.enlargeMap()),
  shrinkMap: () => dispatch(BagActions.shrinkMap()),
  resetMap: () => dispatch(BagActions.resetMap()),
  setTheme: darkTheme => dispatch(BagActions.setTheme(darkTheme)),
});

const withWrappers = _.flowRight(connect(mapStateToProps, mapDispatchToProps), [WithHeaderAndNav]);

export default withWrappers(BagSetup);
