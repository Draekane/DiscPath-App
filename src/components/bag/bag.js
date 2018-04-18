import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

import { discShape } from '../../propTypeShapes/bagShapes';
import DiscType from './discType';

const Bag = (props) => {
  const { discs } = props;

  const getDistanceDrivers = () => _.filter(discs, disc => disc.type === 'D');
  const getFairwayDrivers = () => _.filter(discs, disc => disc.type === 'F');
  const getMidrange = () => _.filter(discs, disc => disc.type === 'M');
  const getPutters = () => _.filter(discs, disc => disc.type === 'P');

  return (
    <React.Fragment>
      <DiscType discs={getDistanceDrivers()} title="Distance Drivers" />
      <DiscType discs={getFairwayDrivers()} title="Fairway Drivers" />
      <DiscType discs={getMidrange()} title="Midranges" />
      <DiscType discs={getPutters()} title="Putt and Approach" />
    </React.Fragment>
  );
};

Bag.propTypes = {
  discs: PropTypes.arrayOf(discShape),
};

export default Bag;
