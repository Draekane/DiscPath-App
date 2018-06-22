import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import Modal from 'react-modal';
import { FaToggleOn, FaToggleOff, FaClose } from 'react-icons/lib/fa';

import { displayOptionsShape } from '../../propTypeShapes/bagShapes';

const DisplayOptions = ({
  options,
  changeFanPower,
  changePaths,
  changeDistance,
  changeCircles,
  openModal,
  closeModal,
}) => {
  const handleChangePaths = (value) => {
    if (value !== null) changePaths(value.value);
  };

  const getCurrentSpread = (fanPower) => {
    if (fanPower) return (<FaToggleOn onClick={changeFanPower} color="blue" />);
    return (<FaToggleOff onClick={changeFanPower} color="darkBlue" />);
  };

  const getLabels = (lieDistance) => {
    if (lieDistance) return (<FaToggleOn onClick={changeDistance} color="blue" />);
    return (<FaToggleOff onClick={changeDistance} color="darkBlue" />);
  };

  const getCircles = (lieCircle) => {
    if (lieCircle) return (<FaToggleOn onClick={changeCircles} color="blue" />);
    return (<FaToggleOff onClick={changeCircles} color="darkBlue" />);
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
      <div className="title-block" >Display Options:</div>
      <div className="display-options" >
        <div className="display-options-item item1" >
          <strong>Spread:</strong>
        </div>
        <div className="display-options-item item2" >
          {getCurrentSpread(options.fanPower)}
        </div>
        <div className="display-options-item item3" >
          <strong className="path-per-disc-title">Paths Per Disc:</strong>
        </div>
        <div className="display-options-item item4" >
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
        <div className="display-options-item item5" >
          <strong>Labels:</strong>
        </div>
        <div className="display-options-item item6" >
          {getLabels(options.lieDistance)}
        </div>
        <div className="display-options-item item7" >
          <strong>Circles (10m/15m):</strong>
        </div>
        <div className="display-options-item item8" >
          {getCircles(options.lieCircle)}
        </div>
      </div>
    </Modal>
  );
};

DisplayOptions.propTypes = {
  options: PropTypes.shape(displayOptionsShape),
  changeFanPower: PropTypes.func,
  changePaths: PropTypes.func,
  changeDistance: PropTypes.func,
  changeCircles: PropTypes.func,
  openModal: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default DisplayOptions;
