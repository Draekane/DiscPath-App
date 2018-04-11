import PropTypes from 'prop-types';
import React from 'react';

const Disc = (props) => {
  const {
    company,
    name,
    enabled,
    wear,
  } = props;

  const handleChangeValue = (value, event) => {
    const { discId, setWearFunc } = props;
    if (setWearFunc != null) {
      setWearFunc(value, discId, event);
    }
  };

  const handleRemove = (event) => {
    const { discId, removeFunc } = props;
    if (removeFunc != null) {
      removeFunc(discId, event);
    }
  };

  const handleSetEnable = (event) => {
    const { discId, enableFunc } = props;
    if (enableFunc != null) {
      enableFunc(discId, !enabled, event);
    }
  };

  const boundHandleChangeValue = handleChangeValue.bind(this, this.value);
  const boundHandleRemove = handleRemove.bind(this);
  const boundHandleSetEnable = handleSetEnable.bind(this);

  return (
    <div>
      <input type="check" checked={enabled} onClick={boundHandleSetEnable} />
      {company} {name}
      <input type="range" min="1" max="10" value={wear} onChange={boundHandleChangeValue} />
      <button onClick={boundHandleRemove} type="button">Remove</button>
    </div>
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
