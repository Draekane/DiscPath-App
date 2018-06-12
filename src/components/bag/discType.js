import PropTypes from 'prop-types';
import React from 'react';
import ReactTable from 'react-table';
import { FaEyeSlash, FaEye, FaTrashO } from 'react-icons/lib/fa';

import { discShape } from '../../propTypeShapes/bagShapes';

const DiscType = (props) => {
  const {
    discs,
    functions,
    discType,
    headerClassName,
  } = props.props;

  const createWearValues = (baggedDiscId) => {
    const options = [];

    for (let i = 10; i > 0; i -= 1) {
      options.push((
        <option key={`wear_${i}_${baggedDiscId}`} value={`{"wear": ${i}, "baggedDiscId": ${baggedDiscId}}`}>
          {i}/10
        </option>));
    }

    return (options);
  };

  const handleDisableDisc = (value) => {
    const { original } = value;
    const { baggedDiscId, enabled } = original;
    functions.handleEnableDisc(baggedDiscId, enabled);
  };

  const handleDisableDiscType = () => {
    functions.handleEnableDiscType(discType.discType, discType.enabled);
  };

  const handleSetWear = (wearObj) => {
    const wearData = JSON.parse(wearObj.target.value);

    functions.handleSetDiscWear(wearData.baggedDiscId, wearData.wear);
  };

  const handleDiscRemove = (baggedDiscId) => {
    functions.handleRemoveDisc(baggedDiscId);
  };

  const createHeader = () => {
    const { enabled, discType: discFlightType, title } = discType;
    if (discFlightType !== null && discFlightType !== undefined && discs.length > 0) {
      if (enabled) {
        return (
          <div className={headerClassName}>
            <FaEye onClick={handleDisableDiscType} color="green" />
            {title}
          </div>);
      }
      return <div className={headerClassName}><FaEyeSlash onClick={handleDisableDiscType} />&nbsp;&nbsp;{title}</div>;
    }
    return <div className={headerClassName}>&nbsp;&nbsp;{title}</div>;
  };

  return (
    <ReactTable
      data={discs}
      minRows="0"
      showPagination={false}
      columns={[
        {
          Header: createHeader(),
          headerClassName,
          columns: [
            {
              Header: 'View',
              accessor: 'enabled',
              Cell: (row) => {
                if (row.value === true) {
                  return <FaEye onClick={handleDisableDisc.bind(this, row)} color="green" />;
                }
                return <FaEyeSlash onClick={handleDisableDisc.bind(this, row)} />;
              },
              width: 25,
            },
            {
              Header: 'Company',
              accessor: 'company',
            },
            {
              Header: 'Disc',
              accessor: 'name',
            },
            {
              Header: 'Edit',
              accessor: 'wear',
              width: 75,
              Cell: row => (
                <select
                  onChange={handleSetWear}
                  selectedvalue={row.value}
                >
                  {createWearValues(row.original.baggedDiscId)}
                </select>
              ),
            },
            {
              Header: 'Remove',
              accessor: 'baggedDiscId',
              width: 40,
              Cell: row => (<FaTrashO onClick={handleDiscRemove.bind(this, row.value)} color="red" />),
            },
          ],
        },
      ]}
      className="-striped -highlight"
    />
  );
};

DiscType.propTypes = {
  props: PropTypes.shape({
    discs: PropTypes.arrayOf(discShape),
    discType: PropTypes.shape({
      title: PropTypes.string,
      enabled: PropTypes.bool,
      discType: PropTypes.string,
    }),
    headerClassName: PropTypes.string,
    functions: PropTypes.shape({
      handleEnableDiscType: PropTypes.func,
      handleEnableDisc: PropTypes.func,
      handleSetDiscWear: PropTypes.func,
      handleRemoveDisc: PropTypes.func,
    }),
  }),
};

export default DiscType;
