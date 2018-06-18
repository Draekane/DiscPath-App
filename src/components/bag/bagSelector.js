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
      <FaFloppyO onClick={handleUpdateBagNameFinish} color="green" />&nbsp;&nbsp;&nbsp;
      <FaTimesCircleO onClick={handleUpdateBagNameCancel} color="red" />
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
      <FaPlusSquareO onClick={handleAddBagFinish} color="green" />&nbsp;&nbsp;&nbsp;
      <FaTimesCircleO onClick={handleAddBagCancel} color="red" />
    </React.Fragment>
  );

  const bagNameSelector = (
    <React.Fragment>
      {addBag} {updateBag}
      <select id="bag-selector" defaultValue={selectedBagId} onChange={handleSelectBag} >
        {currentBagOptions}
      </select>&nbsp;&nbsp;&nbsp;
      <FaPencil onClick={handleUpdateBagNameStart} color="green" />&nbsp;&nbsp;&nbsp;
      <FaPlusSquareO onClick={handleAddBagStart} color="blue" />&nbsp;&nbsp;&nbsp;
      <FaTrashO onClick={handleRemoveBag} color="red" />
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
