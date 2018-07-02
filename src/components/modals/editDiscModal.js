import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import Slider from 'react-rangeslider';
import { FaClose } from 'react-icons/lib/fa';

import { discShape, throwerShape } from '../../propTypeShapes/bagShapes';
import { powerPercentage, throwerTypeOptions } from '../../utils/throwerValueUtils';
import EditLabel from '../layout/editLabel';

const EditDiscModal = (props) => {
  const {
    editDisc,
    functions,
    thrower,
    hideWeight,
    hidePower,
    hideThrowType,
    hideWear,
  } = props.props;
  if (!editDisc) return null;

  const {
    company,
    displayName,
    maxWeight,
    name,
    power,
    throwType,
    wear,
    weight,
    disableNameEdit,
  } = editDisc;

  const {
    power: throwerPower,
    throwType: throwerThrowType,
  } = thrower;

  const handleDiscDisplayNameChange = (value) => {
    if (value) functions.changeDisplayName(value);
  };

  const handleDiscWearChange = (value) => {
    if (value) functions.changeDiscWear(value);
  };

  const handleDiscWeightChange = (value) => {
    if (value) functions.changeDiscWeight(value);
  };

  const handleDiscPowerChange = (value) => {
    if (value) functions.changeDiscPower(value);
  };

  const handleDiscThrowTypeChange = (value) => {
    if (value) functions.changeDiscThrowType(value.value);
  };

  const handleCloseEdit = () => {
    functions.closeModal();
  };

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    content: {
      top: '25%',
      left: '25%',
      width: '25%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-20%',
      transform: 'translate(-20%, -20%)',
      border: 'none',
    },
  };

  const displayedName = (displayName && displayName !== '') ? displayName : `${company} ${name}`;

  const displayWeightSelector = (weight, maxWeight) => {
    if (maxWeight) {
      return (
        <div className="editBlock">
          <label htmlFor="discWeight">Weight (optional): {weight || maxWeight}</label>
          <Slider
            value={weight || maxWeight}
            orientation="horizontal"
            min={120}
            max={maxWeight}
            className="wear-slider"
            onChange={handleDiscWeightChange}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <Modal
      isOpen={editDisc !== null}
      onRequestClose={handleCloseEdit}
      style={customStyles}
    >
      <FaClose onClick={handleCloseEdit} className="fa-close-icon" />
      <h2><EditLabel value={displayedName} updateFunction={handleDiscDisplayNameChange} disabled={disableNameEdit} /></h2>
      <div>
        { (!hideWeight) ? displayWeightSelector(weight, maxWeight) : null}
        { (!hidePower) ? (
          <div className="editBlock">
            <label htmlFor="discPower">Power (optional): {powerPercentage(power || throwerPower)}</label>
            <Slider
              value={power || throwerPower}
              orientation="horizontal"
              min={0}
              max={48}
              className="power-slider"
              format={powerPercentage}
              onChange={handleDiscPowerChange}
            />
          </div>) : null }
        { (!hideThrowType) ? (
          <div className="editBlock" >
            <label htmlFor="discThrowType">ThrowType (optional): </label>
            <Select
              name="ThrowerTypeSelector"
              id="ThrowerTypeSelector"
              className="type-select"
              options={throwerTypeOptions}
              value={throwType || throwerThrowType}
              onChange={handleDiscThrowTypeChange}
            />
          </div>) : null }
        { (!hideWear) ? (
          <div className="editBlock">
            <label htmlFor="discWear">Wear (optional): {wear}</label>
            <Slider
              value={wear}
              orientation="horizontal"
              min={0}
              max={10}
              className="wear-slider"
              onChange={handleDiscWearChange}
            />
          </div>) : null }
      </div>
    </Modal>
  );
};

EditDiscModal.propTypes = {
  props: PropTypes.shape({
    editDisc: PropTypes.shape(discShape),
    thrower: PropTypes.shape(throwerShape),
    hideWeight: PropTypes.bool,
    hidePower: PropTypes.bool,
    hideThrowType: PropTypes.bool,
    hideWear: PropTypes.bool,
    disableNameEdit: PropTypes.bool,
    functions: PropTypes.shape({
      changeDisplayName: PropTypes.func,
      changeDiscWeight: PropTypes.func,
      changeDiscPower: PropTypes.func,
      changeDiscThrowType: PropTypes.func,
      changeDiscWear: PropTypes.func,
      closeModal: PropTypes.func,
    }),
  }),
};

export default EditDiscModal;
