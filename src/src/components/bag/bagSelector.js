import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import { FaPencil, FaPlusSquareO, FaFloppyO, FaTimesCircleO, FaTrashO } from 'react-icons/lib/fa';

import { bagShape } from '../../propTypeShapes/bagShapes';

const BagSelector = (props) => {
  const {
    bags,
    addBag,
    updateBag,
    functions,
    selectedBagId,
  } = props.props;

  const currentBag = _.first(bags, bag => bag.bagId === selectedBagId);

  const currentBagOptions = bags.map(bag =>
    (<option value={bag.bagId} key={bag.bagId} >{bag.name}</option>));

  const handleAddBagStart = () => {
    functions.handleAddBagStart();
  };

  const handleRemoveBag = () => {
    functions.handleRemoveBag();
  };

  const handleUpdateBagNameStart = () => {
    functions.handleUpdateBagNameStart();
  };

  const handleAddBagFinish = () => {
    if (this.bagName !== null) {
      const input = this.bagName;
      const inputValue = input.value;
      functions.handleAddBagFinish(inputValue);
    }
  };

  const handleUpdateBagNameFinish = () => {
    if (this.bagName !== null) {
      const input = this.bagName;
      const inputValue = input.value;
      functions.handleUpdateBagNameFinish(inputValue);
    }
  };

  const handleAddBagCancel = () => {
    functions.handleAddBagCancel();
  };

  const handleUpdateBagNameCancel = () => {
    functions.handleUpdateBagNameCancel();
  };

  const handleSelectBag = (event) => {
    if (event !== null) functions.handleSelectBag(event.target.value);
  };

  const bagNameEditor = (
    <React.Fragment>
      <input
        name="bagName"
        id="bagName"
        ref={(ref) => { this.bagName = ref; }}
        defaultValue={currentBag.name}
      />&nbsp;&nbsp;&nbsp;
      <span title="Save Bag Name Update" >
        <FaFloppyO onClick={handleUpdateBagNameFinish} className="fa-floppyO-icon greenFill" />
      </span>&nbsp;&nbsp;&nbsp;
      <span title="Cancel Bag Name Update" >
        <FaTimesCircleO onClick={handleUpdateBagNameCancel} className="fa-times-circleO-icon redFill" />
      </span>
    </React.Fragment>
  );

  const bagAdder = (
    <React.Fragment>
      <input
        name="bagName"
        id="bagName"
        ref={(ref) => { this.bagName = ref; }}
        defaultValue={currentBag.name}
      />&nbsp;&nbsp;&nbsp;
      <span title="Save New Bag">
        <FaFloppyO onClick={handleAddBagFinish} className="fa-floppyO-icon greenFill" />
      </span>&nbsp;&nbsp;&nbsp;
      <span title="Cancel Adding New Bag" >
        <FaTimesCircleO onClick={handleAddBagCancel} className="fa-times-circleO-icon redFill" />
      </span>
    </React.Fragment>
  );

  const bagNameSelector = (
    <React.Fragment>
      {addBag} {updateBag}
      <select id="bag-selector" defaultValue={selectedBagId} onChange={handleSelectBag} >
        {currentBagOptions}
      </select>&nbsp;&nbsp;&nbsp;
      <span title="Edit Current Bag Name" >
        <FaPencil onClick={handleUpdateBagNameStart} className="fa-pencil-icon greenFill" />
      </span>&nbsp;&nbsp;&nbsp;
      <span title="Add New Bag" >
        <FaPlusSquareO onClick={handleAddBagStart} className="fa-plus-squareO-icon blueFill" />
      </span>&nbsp;&nbsp;&nbsp;
      <span title="Remove Existing Bag" >
        <FaTrashO onClick={handleRemoveBag} className="fa-trashO-icon redFill" />
      </span>
    </React.Fragment>
  );

  if (addBag) return bagAdder;
  else if (updateBag) return bagNameEditor;
  return bagNameSelector;
};

BagSelector.propTypes = {
  bags: PropTypes.arrayOf(bagShape),
  addBag: PropTypes.bool,
  updateBag: PropTypes.bool,
  selectedBagId: PropTypes.number,
  functions: PropTypes.shape({
    handleAddBagStart: PropTypes.func,
    handleAddBagFinish: PropTypes.func,
    handleAddBagCacnel: PropTypes.func,
    handleUpdateBagNameStart: PropTypes.func,
    handleUpdateBagNameFinish: PropTypes.func,
    handleUpdateBagNameCancel: PropTypes.func,
    handleSelectBag: PropTypes.func,
    handleRemoveBag: PropTypes.func,
  }),
};

export default BagSelector;
