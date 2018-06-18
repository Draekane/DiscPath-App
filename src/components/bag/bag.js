import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

import { bagShape } from '../../propTypeShapes/bagShapes';
import DiscType from './discType';
import BagSelector from './bagSelector';

const Bag = (props) => {
  const {
    bags,
    selectedBagId,
    addBag,
    updateBag,
    discTypes,
    functions,
  } = props.props;

  const currentBag = _.filter(bags, bag => bag.bagId === parseInt(selectedBagId, 10))[0];

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

  const bagSelectorOptions = {
    addBag,
    updateBag,
    bags,
    functions,
    selectedBagId,
  };

  const getDiscFrame = () => (
    <div className="bag-container">
      <BagSelector props={bagSelectorOptions} />
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
    addBag: PropTypes.bool,
    updateBag: PropTypes.bool,
    functiones: PropTypes.shape({
      handleEnableDisc: PropTypes.func,
      handleSetDiscWear: PropTypes.func,
      handleRemoveDisc: PropTypes.func,
      handleEnableDiscType: PropTypes.func,
      handleAddBagStart: PropTypes.func,
      handleAddBagFinish: PropTypes.func,
      handleAddBagCacnel: PropTypes.func,
      handleUpdateBagNameStart: PropTypes.func,
      handleUpdateBagNameFinish: PropTypes.func,
      handleUpdateBagNameCancel: PropTypes.func,
      handleSelectBag: PropTypes.func,
      handleEditDisc: PropTypes.func,
      handleRemoveBag: PropTypes.func,
    }),
  }),
};

export default Bag;
