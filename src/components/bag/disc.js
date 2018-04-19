import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';

const Disc = (props) => {
  const {
    discId,
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

  const createWearSelector = (disc) => {
    const selectOptions = []
    for(let i = 10; i > 0; i -= 1) {
      selectOptions.push({ label: `${i}/10`, value: i });
    }

    return (
      <Select 
      name={`${disc.discId}_discWearSelector`}
      id={`${disc.discId}_discWearSelector`}
    options={selectOptions}
    value={disc.wear}
    autosize={true} 
    />
    )
  }

  return (
    <tr>
      <td>
      <input type="checkBox" checked={enabled} onClick={handleSetEnable} />
      </td><td>
      {company} {name}
      </td><td>
        {createWearSelector(discId, wear)}
        </td><td>
      <button onClick={handleRemove} type="button">Remove</button>
      </td>
    </tr>
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
