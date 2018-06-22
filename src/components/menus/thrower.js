import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import Slider from 'react-rangeslider';
import Modal from 'react-modal';
import { FaClose } from 'react-icons/lib/fa';

import { throwerShape } from '../../propTypeShapes/bagShapes';
import { powerPercentage, throwerTypeOptions } from '../../utils/throwerValueUtils';

const Thrower = ({
  thrower,
  changePower,
  changeThrowerType,
  openModal,
  closeModal,
}) => {
  const handlePowerChange = (value) => {
    changePower(value);
  };

  const handleThrowerTypeChange = (value) => {
    if (value !== null) { changeThrowerType(value.value); }
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

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <FaClose onClick={closeModal} color="red" style={{ float: 'right', 'z-index': '100' }} />
      <div className="title-block" >
      Thrower:
      </div>
      <div className="thrower-container" >
        <div className="thrower-item item1" >
          <div className="type-title" >Type: </div>
          <Select
            name="ThrowerTypeSelector"
            id="ThrowerTypeSelector"
            className="type-select"
            options={throwerTypeOptions}
            value={thrower.throwType}
            onChange={handleThrowerTypeChange}
          />
        </div>
        <div className="thrower-item item2" >
          <div className="power-title" >Power: </div>
          <Slider
            value={thrower.power}
            orientation="horizontal"
            min={0}
            max={48}
            className="power-slider"
            format={powerPercentage}
            onChange={handlePowerChange}
          />
        </div>
        <div className="thrower-item power-output">
            (<strong>{powerPercentage(thrower.power)}</strong> of nominal airspeed required)
        </div>
      </div>
    </Modal>
  );
};

Thrower.propTypes = {
  thrower: PropTypes.shape(throwerShape),
  changePower: PropTypes.func,
  changeThrowerType: PropTypes.func,
  openModal: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default Thrower;
