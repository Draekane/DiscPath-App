import PropTypes from 'prop-types';
import React from 'react';
import ReactTable from 'react-table';
import { FaCircleO, FaDotCircleO, FaTrashO } from 'react-icons/lib/fa';

import { discShape } from '../../propTypeShapes/bagShapes';

const DiscType = (props) => {
  const {
    discs,
    title,
    handleEnableDisc,
    headerClassName,
    handleSetDiscWear,
    handleRemoveDisc,
  } = props;

  const createWearValues = (baggedDiscId) => {
    const options = [];

    for (let i = 10; i > 0; i -= 1) {
      options.push(<option value={`{"wear": ${i}, "baggedDiscId": ${baggedDiscId}}`}>{i}/10</option>);
    }

    return (options);
  };

  const handleDisableDisc = (value) => {
    const { original } = value;
    const { baggedDiscId, enabled } = original;
    handleEnableDisc(baggedDiscId, enabled);
  };

  const handleSetWear = (wearObj) => {
    const wearData = JSON.parse(wearObj.target.value);

    handleSetDiscWear(wearData.baggedDiscId, wearData.wear);
  };

  const handleDiscRemove = (baggedDiscId) => {
    handleRemoveDisc(baggedDiscId);
  };

  return (
    <ReactTable
      data={discs}
      minRows="0"
      showPagination={false}
      noDataText={`Add ${title}`}
      columns={[
        {
          Header: title,
          headerClassName,
          columns: [
            {
              accessor: 'enabled',
              Cell: (row) => {
                if (row.value === true) {
                  return <FaDotCircleO onClick={handleDisableDisc.bind(this, row)} />;
                }
                return <FaCircleO onClick={handleDisableDisc.bind(this, row)} />;
              },
              width: 25,
            },
            {
              accessor: 'company',
            },
            {
              accessor: 'name',
            },
            {
              accessor: 'wear',
              width: 75,
              Cell: row => (
                <select
                  onChange={handleSetWear}
                  selectedValue={row.value}
                >
                  {createWearValues(row.original.baggedDiscId)}
                </select>
              ),
            },
            {
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
  discs: PropTypes.arrayOf(discShape),
  title: PropTypes.string,
  headerClassName: PropTypes.string,
  handleEnableDisc: PropTypes.func,
  handleSetDiscWear: PropTypes.func,
  handleRemoveDisc: PropTypes.func,
};

export default DiscType;
