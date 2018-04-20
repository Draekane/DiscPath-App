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
      <div className="display-options-title" >Display Options:</div>
      <div className="display-options" >
        <div className="display-options-item item1" >
          <strong>Spread:</strong>
          {getCurrentSpread(options.fanPower)}
        </div>
        <div className="display-options-item item2" >
          <strong className="path-per-disc-title">Paths Per Disc:</strong>
          <Select
            name="PathsSelector"
            id="PathsSelector"
            className="path-per-disc-select"
            options={pathsOptions}
            value={options.pathsShown}
            onChange={handleChangePaths}
            scrollMenuIntoView={false}
          />
        </div>
        <div className="display-options-item item3" >
          <strong>Labels:</strong>
          {getLabels(options.lieDistance)}
        </div>
        <div className="display-options-item item4" >
          <strong>Circles (10m/15m):</strong>
          {getCircles(options.lieCircle)}
        </div>
      </div>
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
