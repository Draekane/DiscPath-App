// External Imports
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
// Internal Imports
import CompanyDiscs from '../components/company/companyDiscs';
import Bag from '../components/bag/bag';
import EditDiscModal from '../components/bag/editDiscModal';
// Shapes
import { companyShape } from '../propTypeShapes/companyShapes';
import { throwerShape, bagShape } from '../propTypeShapes/bagShapes';
// Actions
import * as CompanyActions from '../actions/company';
import * as BagActions from '../actions/bag';
// Selectors
import { currentCompaniesSelector, currentSelectionSelector } from '../selector/companiesSelector';
import { bagSelector, discTypesSelector } from '../selector/bagSelector';
import { throwerSelector } from '../selector/throwerSelector';

class BagContainer extends Component {
    getDiscById = (discId) => {
      const { companies } = this.props;
      if (!discId) return null;
      const discData = discId.split('-');

      if (discData.length === 2) {
        const company = _.find(companies, company => company.companyId === discData[0]);
        if (company) {
          const disc = _.find(company.discs, disc => disc.discId === discData[1]);
          return { company, disc };
        }
      }
      return null;
    }

    getBaggedDiscById = (baggedDiscId) => {
      const { currentBags, selectedBagId } = this.props;
      if (!baggedDiscId) return null;
      const bag = _.find(currentBags, bag => bag.bagId === selectedBagId);
      if (bag) {
        const disc = _.find(bag.discs, disc => disc.baggedDiscId === baggedDiscId);
        return disc;
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

    handleEditDiscName = (value) => {
      const { dispatch } = this.props;

      dispatch(BagActions.editDiscName(value));
    }

    handleSetDiscWear = (wear) => {
      const { dispatch } = this.props;

      dispatch(BagActions.setDiscWear(wear));
    }

    handleSetDiscWeight = (weight) => {
      const { dispatch } = this.props;

      dispatch(BagActions.editDiscWeight(weight));
    }

    handleSetDiscPower = (power) => {
      const { dispatch } = this.props;

      dispatch(BagActions.editDiscPower(power));
    }

    handleSetDiscThrowType = (throwType) => {
      const { dispatch } = this.props;

      dispatch(BagActions.editDiscThrowType(throwType));
    }

    handleDiscRemove = (baggedDiscId) => {
      const { dispatch } = this.props;

      dispatch(BagActions.removeDiscFromBag(baggedDiscId));
    }

    handleAddBagStart = () => {
      const { dispatch } = this.props;

      dispatch(BagActions.addNewBagStart());
    }

    handleAddBagFinish = (bagName) => {
      const { dispatch } = this.props;

      dispatch(BagActions.addNewBagFinish(bagName));
    }

    handleAddBagCancel = () => {
      const { dispatch } = this.props;

      dispatch(BagActions.addNewBagCancel());
    }

    handleRemoveBag = () => {
      const { dispatch } = this.props;

      dispatch(BagActions.removeExistingBag());
    }

    handleUpdateBagNameStart = () => {
      const { dispatch } = this.props;

      dispatch(BagActions.updateBagNameStart());
    }

    handleUpdateBagNameFinish = (bagName) => {
      const { dispatch } = this.props;

      dispatch(BagActions.updateBagNameFinish(bagName));
    }

    handleUpdateBagNameCancel = () => {
      const { dispatch } = this.props;

      dispatch(BagActions.updateBagNameCancel());
    }

    handleSelectBag = (bagId) => {
      const { dispatch } = this.props;

      dispatch(BagActions.selectBag(bagId));
    }

    handleEditDisc = (discId) => {
      const { dispatch } = this.props;

      dispatch(BagActions.openDiscEditModal(discId));
    }

    handleCloseEditDisc = () => {
      const { dispatch } = this.props;

      dispatch(BagActions.closeDiscEditModal());
    }

    render() {
      const {
        addBag,
        companies,
        currentBags,
        currentSelection,
        discTypes,
        editingDiscId,
        selectedBagId,
        thrower,
        updateBag,
      } = this.props;

      const modalOptions = {
        editDisc: this.getBaggedDiscById(editingDiscId),
        thrower,
        functions: {
          closeModal: this.handleCloseEditDisc,
          changeDisplayName: this.handleEditDiscName,
          changeDiscWear: this.handleSetDiscWear,
          changeDiscWeight: this.handleSetDiscWeight,
          changeDiscPower: this.handleSetDiscPower,
          changeDiscThrowType: this.handleSetDiscThrowType,
        },
      };

      const bagOptions = {
        bags: currentBags,
        discTypes,
        selectedBagId,
        addBag,
        updateBag,
        functions: {
          handleAddBagCancel: this.handleAddBagCancel,
          handleAddBagFinish: this.handleAddBagFinish,
          handleAddBagStart: this.handleAddBagStart,
          handleEditDisc: this.handleEditDisc,
          handleEnableDisc: this.handleEnableDisc,
          handleEnableDiscType: this.handleEnableDiscType,
          handleRemoveDisc: this.handleDiscRemove,
          handleSelectBag: this.handleSelectBag,
          handleUpdateBagNameCancel: this.handleUpdateBagNameCancel,
          handleUpdateBagNameFinish: this.handleUpdateBagNameFinish,
          handleUpdateBagNameStart: this.handleUpdateBagNameStart,
          handleRemoveBag: this.handleRemoveBag,
        },
      };

      const content = (
        <React.Fragment >
          <EditDiscModal
            props={modalOptions}
          />
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
        </React.Fragment>
      );

      return content;
    }
}

BagContainer.propTypes = {
  companies: PropTypes.arrayOf(companyShape),
  currentSelection: PropTypes.string,
  currentBags: PropTypes.arrayOf(bagShape),
  discTypes: PropTypes.shape({
    discType: PropTypes.string,
    enabled: PropTypes.bool,
  }),
  dispatch: PropTypes.func,
  selectedBagId: PropTypes.number,
  editingDiscId: PropTypes.number,
  addBag: PropTypes.bool,
  updateBag: PropTypes.bool,
  thrower: PropTypes.shape(throwerShape),
};

BagContainer.defaultProps = {
  currentSelection: null,
  currentBags: [],
  discTypes: null,
  selectedBagId: 1,
  editingDiscId: 0,
  addBag: false,
  updateBag: false,
  thrower: null,
};

const mapStateToProps = state => ({
  companies: currentCompaniesSelector(state),
  currentSelection: currentSelectionSelector(state),
  currentBags: bagSelector(state),
  discTypes: discTypesSelector(state),
  selectedBagId: state.bag.selectedBagId,
  editingDiscId: state.bag.editingDiscId,
  thrower: throwerSelector(state),
  dispatch: state.dispatch,
  addBag: state.bag.addBag,
  updateBag: state.bag.updateBag,
});

export default connect(mapStateToProps)(BagContainer);
