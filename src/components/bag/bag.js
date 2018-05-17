import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

import { bagShape } from '../../propTypeShapes/bagShapes';
import DiscType from './discType';

const Bag = (props) => {
  const {
    bags,
    selectedBagId,
    discTypes,
    functions,
  } = props.props;

  const currentBag = _.first(bags, bag => bag.bagId === selectedBagId);

  const currentBagOptions = bags.map((bag) => (<option value={bag.bagId} selected={bag.bagId === selectedBagId} >{bag.name}</option>));

  const distanceOptions = {
    discs: _.filter(currentBag.discs, disc => disc.type === 'D'),
    discType: _.find(discTypes, discType => discType.discType === 'D'),
    headerClassName: 'disc-type distance-header',
    functions,
  };

  const fairwayOptions = {
    discs: _.filter(currentBag.discs, disc => disc.type === 'F'),
    discType: _.find(discTypes, discType => discType.discType === 'F'),
    headerClassName: 'disc-type fairway-header',
    functions,
  };

  const midrangeOptions = {
    discs: _.filter(currentBag.discs, disc => disc.type === 'M'),
    discType: _.find(discTypes, discType => discType.discType === 'M'),
    headerClassName: 'disc-type midrange-header',
    functions,
  };

  const putterOptions = {
    discs: _.filter(currentBag.discs, disc => disc.type === 'P'),
    discType: _.find(discTypes, discType => discType.discType === 'P'),
    headerClassName: 'disc-type putter-header',
    functions,
  };

  const bagSelector = (<select id="bag-selector" >
    {currentBagOptions}
  </select>);

  const getDiscFrame = () => (
    <div className="bag-container">
      <div className="bag-name" >Bag: {bagSelector}</div>
      <div className="title-block" >Discs in Bag:</div>
      <DiscType
        props={distanceOptions}
      />
      <DiscType
        props={fairwayOptions}
      />
      <DiscType
        props={midrangeOptions}
      />
      <DiscType
        props={putterOptions}
      />
    </div>
  );

  return getDiscFrame();
};

Bag.propTypes = {
  props: PropTypes.shape({
    bags: PropTypes.arrayOf(bagShape),
    selectedBagId: PropTypes.number,
    discTypes: PropTypes.shape({ discType: PropTypes.string, enabled: PropTypes.bool }),
    functiones: PropTypes.shape({
      handleEnableDisc: PropTypes.func,
      handleSetDiscWear: PropTypes.func,
      handleRemoveDisc: PropTypes.func,
      handleEnableDiscType: PropTypes.func,
    }),
  }),
};

export default Bag;
