import PropTypes from 'prop-types';
import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';
import _ from 'lodash';

import CompanyDiscs from '../components/company/companyDiscs';
import Bag from '../components/bag/bag';

import { companyShape } from '../propTypeShapes/companyShapes';
import { bagShape } from '../propTypeShapes/bagShapes';
import * as CompanyActions from '../actions/company';
import * as BagActions from '../actions/bag';
import { currentCompaniesSelector, currentSelectionSelector } from '../selector/companiesSelector';
import { bagSelector, discTypesSelector } from '../selector/bagSelector';

class BagContainer extends Component {

    getDiscById = (discId) => {
        const { companies } = this.props;
        const discData = discId.split('-');
    
        if (discData.length === 2) {
          const company = _.find(companies, company => company.companyId === discData[0]);
          if (company !== null) {
            const disc = _.find(company.discs, disc => disc.discId === discData[1]);
            return { company, disc };
          }
        }
        return null;
    }
    
    handleDiscSelection = (selectedOptions) => {
        const {
            dispatch
        } = this.props;
        if (selectedOptions !== null) dispatch(CompanyActions.selectDisc(selectedOptions.value));
    }
    handleAddDiscToBag = () => {
        const {
            dispatch,
            currentSelection
        } = this.props;
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
        const {
            dispatch
        } = this.props;

        dispatch(BagActions.setDiscEnable(baggedDiscId, enable));
    }

    handleEnableDiscType = (discType, enable) => {
        const {
            dispatch
        } = this.props;

        dispatch(BagActions.setDiscTypeEnable(discType, enable));
    }

    handleSetDiscWear = (baggedDiscId, wear) => {
        const {
            dispatch
        } = this.props;

        dispatch(BagActions.setDiscWear(baggedDiscId, wear));
    }

    handleDiscRemove = (baggedDiscId) => {
        const {
            dispatch
        } = this.props;

        dispatch(BagActions.removeDiscFromBag(baggedDiscId));
    }

    handleAddBagStart = () => {
        const {
            dispatch
        } = this.props;

        dispatch(BagActions.addNewBagStart());
    }

    handleAddBagFinish = (bagName) => {
        const {
            dispatch
        } = this.props;

        dispatch(BagActions.addNewBagFinish(bagName));
    }

    handleAddBagCancel = () => {
        const {
            dispatch
        } = this.props;

        dispatch(BagActions.addNewBagCancel());
    }

    handleUpdateBagNameStart = () => {
        const {
            dispatch
        } = this.props;

        dispatch(BagActions.updateBagNameStart());
    }

    handleUpdateBagNameFinish = (bagName) => {
        const {
            dispatch
        } = this.props;

        dispatch(BagActions.updateBagNameFinish(bagName));
    }

    handleUpdateBagNameCancel = () => {
        const {
            dispatch
        } = this.props;

        dispatch(BagActions.updateBagNameCancel());
    }

    handleSelectBag = (bagId) => {
        const {
            dispatch
        } = this.props;

        dispatch(BagActions.selectBag(bagId));
    }

    render() {
        const { 
            currentBags ,
            discTypes,
            selectedBagId,
            addBag,
            updateBag,
            companies,
            currentSelection,
        } = this.props;
        const bagOptions = {
            bags: currentBags,
            discTypes,
            selectedBagId,
            addBag,
            updateBag,
            functions: {
                handleEnableDisc: this.handleEnableDisc,
                handleEnableDiscType: this.handleEnableDiscType,
                handleSetDiscWear: this.handleSetDiscWear,
                handleRemoveDisc: this.handleDiscRemove,
                handleAddBagStart: this.handleAddBagStart,
                handleAddBagFinish: this.handleAddBagFinish,
                handleAddBagCancel: this.handleAddBagCancel,
                handleUpdateBagNameStart: this.handleUpdateBagNameStart,
                handleUpdateBagNameFinish: this.handleUpdateBagNameFinish,
                handleUpdateBagNameCancel: this.handleUpdateBagNameCancel,
                handleSelectBag: this.handleSelectBag,
            },
        };



        const content = ( 
            <React.Fragment >
                <Bag 
                    props={bagOptions}
                    className = "bag-item1" 
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
        enabled: PropTypes.bool
    }),
    dispatch: PropTypes.func,
    selectedBagId: PropTypes.number,
    addBag: PropTypes.bool,
    updateBag: PropTypes.bool,
};

BagContainer.defaultProps = {
    currentSelection: null,
    currentBags: [],
    discTypes: null,
    selectedBagId: 1,
    addBag: false,
    updateBag: false,
};

const mapStateToProps = state => ({
    companies: currentCompaniesSelector(state),
    currentSelection: currentSelectionSelector(state),
    currentBags: bagSelector(state),
    discTypes: discTypesSelector(state),
    selectedBagId: state.bag.selectedBagId,
    dispatch: state.dispatch,
    addBag: state.bag.addBag,
    updateBag: state.bag.updateBag,
});

export default connect(mapStateToProps)(BagContainer);