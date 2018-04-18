import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import { discShape } from '../../propTypeShapes/bagShapes';
import Disc from './disc';

const DiscType = (props) => {
  const { discs, title } = props;

  const getDiscDisplay = () => {
    const discStack = {};

    _.forEach(discs, disc => discStack.push(<Disc
      discId={disc.discId}
      company={disc.company}
      name={disc.name}
    />));

    return discStack;
  };
  return (
    <React.Fragment>
      <h3>{title}</h3>
      {getDiscDisplay()}
    </React.Fragment>
  );
};

DiscType.propTypes = {
  discs: PropTypes.arrayOf(discShape),
  title: PropTypes.string,
};

export default DiscType;
