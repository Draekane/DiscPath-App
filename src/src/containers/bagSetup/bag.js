// External Imports
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
// Internal Imports
import CompanyDiscs from '../../components/company/companyDiscs';
import Bag from '../../components/bag/bag';
import EditDiscModal from '../../components/modals/editDiscModal';
// Shapes
import { companyShape } from '../../propTypeShapes/companyShapes';
import { throwerShape, bagShape } from '../../propTypeShapes/bagShapes';
// Actions
import * as CompanyActions from '../../actions/company';
import * as BagActions from '../../actions/bag';
// Selectors
import { currentCompaniesSelector, currentSelectionSelector } from '../../selector/companiesSelector';
import { bagSelector, discTypesSelector } from '../../selector/bagSelector';
import { throwerSelector } from '../../selector/throwerSelector';

class BagContainer extends Component {
    /* INTERNAL HELPER METHODS START */
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

    getCurrentDisc = () => {
      const { currentSelection } = this.props;
      if (!currentSelection) return null;
      return this.getDiscById(currentSelection);
    }

    getCurrentEditingDisc = () => {
      const { editingDiscId } = this.props;
      return this.getBaggedDiscById(editingDiscId);
    }

    getCurrentBag = () => {
      const { currentBags, selectedBagId } = this.props;
      if (!selectedBagId) return null;
      const bag = _.find(currentBags, bag => bag.bagId === selectedBagId);
      return bag;
    }

    /* INTERNAL HELPER METHODS END */

    /* EDITING FUNCTIONS START */

    handleDiscSelection = (selectedOptions) => {
      const { selectDisc } = this.props;
      if (selectedOptions !== null) selectDisc(selectedOptions.value);
    }

    handleAddDiscToBag = () => {
      const {
        addDiscToBag,
      } = this.props;
      const currDisc = this.getCurrentDisc();
      const currentBag = this.getCurrentBag();

      if (currDisc !== null) {
        const selectDisc = {
          ...currDisc.disc,
          discId: currDisc.disc.discId,
          company: currDisc.company.company,
          enabled: true,
          wear: 10,
        };

        addDiscToBag(selectDisc, currentBag);
      }
    }

    handleEnableDisc = (baggedDiscId, enabled) => {
      const {
        editDiscEnabled,
      } = this.props;

      const bag = this.getCurrentBag();
      const disc = this.getBaggedDiscById(baggedDiscId);

      editDiscEnabled(enabled, disc, bag);
    }

    handleEnableDiscType = (discType, enabled) => {
      const {
        editDiscTypeEnabled,
        discTypes,
      } = this.props;

      const bag = this.getCurrentBag();
      const selecteDiscType = _.find(discTypes, dt => dt.discType === discType);

      editDiscTypeEnabled(enabled, selecteDiscType, bag);
    }

    handleEditDiscName = (value) => {
      const { editDiscName } = this.props;
      const bag = this.getCurrentBag();
      const disc = this.getCurrentEditingDisc();

      editDiscName(value, disc, bag);
    }

    handleSetDiscWear = (wear) => {
      const { updateDiscWear } = this.props;
      const bag = this.getCurrentBag();
      const disc = this.getCurrentEditingDisc();

      updateDiscWear(wear, disc, bag);
    }

    handleSetDiscWeight = (weight) => {
      const { editDiscWeight } = this.props;
      const bag = this.getCurrentBag();
      const disc = this.getCurrentEditingDisc();

      editDiscWeight(weight, disc, bag);
    }

    handleSetDiscPower = (power) => {
      const { editDiscPower } = this.props;
      const bag = this.getCurrentBag();
      const disc = this.getCurrentEditingDisc();

      editDiscPower(power, disc, bag);
    }

    handleSetDiscColor = (color) => {
      const { editDiscColor } = this.props;
      const bag = this.getCurrentBag();
      const disc = this.getCurrentEditingDisc();

      editDiscColor(color, disc, bag);
    }

    handleSetDiscThrowType = (throwType) => {
      const { editDiscThrowType } = this.props;
      const bag = this.getCurrentBag();
      const disc = this.getCurrentEditingDisc();

      editDiscThrowType(throwType, disc, bag);
    }

    handleDiscRemove = (baggedDiscId) => {
      const { removeDiscFromBag } = this.props;
      const bag = this.getCurrentBag();
      const disc = this.getBaggedDiscById(baggedDiscId);

      removeDiscFromBag(disc, bag);
    }

    handleAddNewBag = (name) => {
      const { currentBags, addNewBag } = this.props;

      addNewBag(name, currentBags);
    }

    handleRemoveBag = () => {
      const { removeExistingBag, currentBags } = this.props;
      const bag = this.getCurrentBag();

      removeExistingBag(currentBags, bag);
    }

    handleSelectBag = (bagId) => {
      const { selectBag } = this.props;

      selectBag(bagId);
    }

    /* EDITING FUNCTIONS FINISH */

    /* EDITING FLAG FUNCTIONS START */

    handleAddBagStart = () => {
      const { addNewBagStart } = this.props;

      addNewBagStart();
    }

    handleAddBagFinish = (bagName) => {
      const { addNewBagFinish } = this.props;

      this.handleAddNewBag(bagName);
      addNewBagFinish();
    }

    handleAddBagCancel = () => {
      const { addNewBagCancel } = this.props;

      addNewBagCancel();
    }

    handleUpdateBagName = (bagName) => {
      const { editBagName } = this.props;
      const bag = this.getCurrentBag();

      editBagName(bagName, bag);
    }

    handleUpdateBagNameStart = () => {
      const { updateBagNameStart } = this.props;

      updateBagNameStart();
    }

    handleUpdateBagNameFinish = (bagName) => {
      const { updateBagNameFinish } = this.props;

      this.handleUpdateBagName(bagName);
      updateBagNameFinish();
    }

    handleUpdateBagNameCancel = () => {
      const { updateBagNameCancel } = this.props;

      updateBagNameCancel();
    }

    handleEditDisc = (discId) => {
      const { openDiscEditModal } = this.props;

      openDiscEditModal(discId);
    }

    handleCloseEditDisc = () => {
      const { closeDiscEditModal } = this.props;

      closeDiscEditModal();
    }

    /* EDITING FLAG FUNCTIONS FINISH */

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
          changeDiscColor: this.handleSetDiscColor,
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
  discTypes: PropTypes.arrayOf(PropTypes.shape({
    discType: PropTypes.string,
    enabled: PropTypes.bool,
    title: PropTypes.string,
  })),
  selectedBagId: PropTypes.number,
  editingDiscId: PropTypes.number,
  addBag: PropTypes.bool,
  updateBag: PropTypes.bool,
  thrower: PropTypes.shape(throwerShape),
  addDiscToBag: PropTypes.func,
  selectDisc: PropTypes.func,
  editDiscEnabled: PropTypes.func,
  editDiscTypeEnabled: PropTypes.func,
  editDiscName: PropTypes.func,
  editDiscColor: PropTypes.func,
  updateDiscWear: PropTypes.func,
  editDiscWeight: PropTypes.func,
  editDiscPower: PropTypes.func,
  editDiscThrowType: PropTypes.func,
  removeDiscFromBag: PropTypes.func,
  removeExistingBag: PropTypes.func,
  editBagName: PropTypes.func,
  selectBag: PropTypes.func,
  addNewBag: PropTypes.func,
  addNewBagStart: PropTypes.func,
  addNewBagFinish: PropTypes.func,
  addNewBagCancel: PropTypes.func,
  updateBagNameStart: PropTypes.func,
  updateBagNameFinish: PropTypes.func,
  updateBagNameCancel: PropTypes.func,
  openDiscEditModal: PropTypes.func,
  closeDiscEditModal: PropTypes.func,
};

BagContainer.defaultProps = {
  currentSelection: null,
  currentBags: [],
  discTypes: [],
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
  addBag: state.bag.addBag,
  updateBag: state.bag.updateBag,
});

const mapDispatchToProps = dispatch => ({
  addDiscToBag: (disc, bag) => dispatch(BagActions.addDiscToBag(disc, bag)),
  selectDisc: value => dispatch(CompanyActions.selectDisc(value)),
  editDiscEnabled: (enabled, disc, bag) => dispatch(BagActions.editDiscEnabled(enabled, disc, bag)),
  editDiscTypeEnabled: (enabled, discType, bag) => dispatch(BagActions.editDiscTypeEnabled(enabled, discType, bag)),
  editDiscName: (displayName, disc, bag) => dispatch(BagActions.editDiscName(displayName, disc, bag)),
  updateDiscWear: (wear, disc, bag) => dispatch(BagActions.updateDiscWear(wear, disc, bag)),
  editDiscWeight: (weight, disc, bag) => dispatch(BagActions.editDiscWeight(weight, disc, bag)),
  editDiscPower: (power, disc, bag) => dispatch(BagActions.editDiscPower(power, disc, bag)),
  editDiscColor: (color, disc, bag) => dispatch(BagActions.editDiscColor(color, disc, bag)),
  editDiscThrowType: (throwType, disc, bag) => dispatch(BagActions.editDiscThrowType(throwType, disc, bag)),
  removeDiscFromBag: (disc, bag) => dispatch(BagActions.removeDiscFromBag(disc, bag)),
  removeExistingBag: (currentBags, bag) => dispatch(BagActions.removeExistingBag(currentBags, bag)),
  editBagName: (name, bag) => dispatch(BagActions.editBagName(name, bag)),
  selectBag: bagId => dispatch(BagActions.selectBag(bagId)),
  addNewBag: (name, bags) => dispatch(BagActions.addNewBag(name, bags)),
  addNewBagStart: () => dispatch(BagActions.addNewBagStart()),
  addNewBagFinish: () => dispatch(BagActions.addNewBagFinish()),
  addNewBagCancel: () => dispatch(BagActions.addNewBagCancel()),
  updateBagNameStart: () => dispatch(BagActions.updateBagNameStart()),
  updateBagNameFinish: () => dispatch(BagActions.updateBagNameFinish()),
  updateBagNameCancel: () => dispatch(BagActions.updateBagNameCancel()),
  openDiscEditModal: discId => dispatch(BagActions.openDiscEditModal(discId)),
  closeDiscEditModal: () => dispatch(BagActions.closeDiscEditModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BagContainer);
