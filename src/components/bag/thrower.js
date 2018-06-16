import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import Slider from 'react-rangeslider';

import { throwerShape } from '../../propTypeShapes/bagShapes';
import { powerPercentage, throwerTypeOptions } from '../../utils/throwerValueUtils';

const Thrower = ({ thrower, changePower, changeThrowerType }) => {
  const handlePowerChange = (value) => {
    changePower(value);
  };

  const handleThrowerTypeChange = (value) => {
    if (value !== null) { changeThrowerType(value.value); }
  };

  return (
    <React.Fragment>
      <div className="title-block" >
      Thrower:
      </div>
      <div className="thrower-container" >
        <div className="thrower-item item1" >
          <strong className="type-title" >Type:</strong>
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
          <strong className="power-title" >Power:</strong>
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
    </React.Fragment>
  );
};

Thrower.propTypes = {
  thrower: PropTypes.shape(throwerShape),
  changePower: PropTypes.func,
  changeThrowerType: PropTypes.func,
};

export default Thrower;
