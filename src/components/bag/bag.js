import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

import { discShape } from '../../propTypeShapes/bagShapes';
import DiscType from './discType';

const Bag = (props) => {
  const { discs, handleEnableDisc, handleSetDiscWear } = props;

  const distanceDrivers = _.filter(discs, disc => disc.type === 'D');
  const fairwayDrivers = _.filter(discs, disc => disc.type === 'F');
  const midrange = _.filter(discs, disc => disc.type === 'M');
  const putters = _.filter(discs, disc => disc.type === 'P');

  const getDiscFrame = () => {
    return (
      <React.Fragment>
        <DiscType
          discs={distanceDrivers}
          title="Distance Drivers"
          handleEnableDisc={handleEnableDisc}
          handleSetDiscWear={handleSetDiscWear}
          headerClassName="distance-header"
        />
        <DiscType
          discs={fairwayDrivers}
          title="Fairway Drivers"
          handleEnableDisc={handleEnableDisc}
          handleSetDiscWear={handleSetDiscWear}
          headerClassName="fairway-header"
        />
        <DiscType
          discs={midrange}
          title="Midranges"
          handleEnableDisc={handleEnableDisc}
          handleSetDiscWear={handleSetDiscWear}
          headerClassName="midrange-header"
        />
        <DiscType
          discs={putters}
          title="Putt and Approach"
          handleEnableDisc={handleEnableDisc}
          handleSetDiscWear={handleSetDiscWear}
          headerClassName="putter-header"
        />
      </React.Fragment>
    );
  }

  return getDiscFrame();
};

Bag.propTypes = {
  discs: PropTypes.arrayOf(discShape),
  handleEnableDisc: PropTypes.func,
  handleSetDiscWear: PropTypes.func,
};

export default Bag;
