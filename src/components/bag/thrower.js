import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import Slider from 'react-rangeslider';

import { throwerShape } from '../../propTypeShapes/bagShapes';

const Thrower = ({ thrower, changePower, changeThrowerType }) => {
  const throwerTypeOptions = [
    {
      label: 'RhBh/LhFh',
      value: 'rhbh',
    },
    {
      label: 'LhBh/RhFh',
      value: 'lhbh',
    },
  ];

  const handlePowerChange = (value) => {
    changePower(value);
  };

  const handleThrowerTypeChange = (value) => {
    if (value !== null) { changeThrowerType(value.value); }
  };

  const powerPercentage = value => `${Math.floor((0.6 + ((value / 48) * 0.6)) * 100)}%`;

  return (
    <React.Fragment>
      <strong>Thrower:</strong>
      <hr />
      <table>
        <tr>
          <td>
            <strong>Type:</strong>
          </td>
          <td width="150px">
            <Select
              name="ThrowerTypeSelector"
              id="ThrowerTypeSelector"
              options={throwerTypeOptions}
              value={thrower.throwType}
              onChange={handleThrowerTypeChange}
            />
          </td>
          <td><strong>Power:</strong></td>
          <td width="300px">
            <Slider
              value={thrower.power}
              orientation="horizontal"
              min={0}
              max={48}
              format={powerPercentage}
              onChange={handlePowerChange}
            />
          </td>
          <td className="thrower-power-output">
            (<strong>{powerPercentage(thrower.power)}</strong> of nominal airspeed required)
          </td>
        </tr>
      </table>
    </React.Fragment>
  );
};

Thrower.propTypes = {
  thrower: PropTypes.shape(throwerShape),
  changePower: PropTypes.func,
  changeThrowerType: PropTypes.func,
};

export default Thrower;
