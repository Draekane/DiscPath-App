import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import { FaCircleO, FaDotCircleO } from 'react-icons/lib/fa';

import { displayOptionsShape } from '../../propTypeShapes/bagShapes';

const DisplayOptions = ({
  options,
  changeFanPower,
  changePaths,
  changeDistance,
  changeCircles,
}) => {
  const handleChangePaths = (value) => {
    if (value !== null) changePaths(value.value);
  };

  const getCurrentSpread = (fanPower) => {
    if (fanPower) return (<FaDotCircleO onClick={changeFanPower} />);
    return (<FaCircleO onClick={changeFanPower} />);
  };

  const getLabels = (lieDistance) => {
    if (lieDistance) return (<FaDotCircleO onClick={changeDistance} />);
    return (<FaCircleO onClick={changeDistance} />);
  };

  const getCircles = (lieCircle) => {
    if (lieCircle) return (<FaDotCircleO onClick={changeCircles} />);
    return (<FaCircleO onClick={changeCircles} />);
  };

  const pathsOptions = [
    {
      label: 'All', value: 'all',
    },
    {
      label: 'One', value: 'one',
    },
    {
      label: 'None', value: 'none',
    },
  ];

  return (
    <React.Fragment>
      <strong>Display Options:</strong>
      <hr />
      <table width="100%">
        <tr>;
          <td>
            <strong>Spread:</strong>
            {getCurrentSpread(options.fanPower)}
          </td>
          <td>
            <strong>Paths Per Disc:</strong>
            <Select
              name="PathsSelector"
              id="PathsSelector"
              options={pathsOptions}
              value={options.pathsShown}
              onChange={handleChangePaths}
            />
          </td>
          <td>
            <strong>Labels:</strong>
            {getLabels(options.lieDistance)}
          </td>
          <td>
            <strong>Circles (10m/15m):</strong>
            {getCircles(options.lieCircle)}
          </td>
        </tr>
      </table>
    </React.Fragment>
  );
};

DisplayOptions.propTypes = {
  options: PropTypes.shape(displayOptionsShape),
  changeFanPower: PropTypes.func,
  changePaths: PropTypes.func,
  changeDistance: PropTypes.func,
  changeCircles: PropTypes.func,
};

export default DisplayOptions;
