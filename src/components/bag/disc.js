import PropTypes from 'prop-types';
import React from 'react';

const Disc = (props) => {
  const {
    company,
    name,
    enabled,
    wear,
  } = props;

  const handleChangeValue = (value) => {
    const { discId, setWearFunc } = props;
    if (setWearFunc != null) {
      setWearFunc(value, discId);
    }
  };

  const handleRemove = () => {
    const { discId, removeFunc } = props;
    if (removeFunc != null) {
      removeFunc(discId);
    }
  };

  const handleSetEnable = () => {
    const { discId, enableFunc } = props;
    if (enableFunc != null) {
      enableFunc(discId, !enabled);
    }
  };

  return (
    <React.Fragment>
      <input type="check" checked={enabled} onClick={handleSetEnable} />
      {company} {name}
      <input type="range" min="1" max="10" value={wear} onChange={handleChangeValue} />
      <button onClick={handleRemove} type="button">Remove</button>
    </React.Fragment>
  );
};

Disc.propTypes = {
  discId: PropTypes.number.isRequired,
  company: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  enabled: PropTypes.bool,
  wear: PropTypes.number,
  removeFunc: PropTypes.func,
  enableFunc: PropTypes.func,
  setWearFunc: PropTypes.func,
};

Disc.defaultProps = {
  enabled: true,
  wear: 10,
  removeFunc: null,
  enableFunc: null,
  setWearFunc: null,
};

export default Disc;
