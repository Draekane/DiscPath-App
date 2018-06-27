import PropTypes from 'prop-types';
import React from 'react';
import ReactTable from 'react-table';
import { FaEyeSlash, FaEye, FaTrashO, FaEdit } from 'react-icons/lib/fa';

import { discShape } from '../../propTypeShapes/bagShapes';

const DiscType = (props) => {
  const {
    discs,
    functions,
    discType,
    headerClassName,
  } = props.props;

  const handleDisableDisc = (value) => {
    const { original } = value;
    const { baggedDiscId, enabled } = original;
    functions.handleEnableDisc(baggedDiscId, enabled);
  };

  const handleDisableDiscType = () => {
    functions.handleEnableDiscType(discType.discType, discType.enabled);
  };

  const handleDiscRemove = (baggedDiscId) => {
    functions.handleRemoveDisc(baggedDiscId);
  };

  const handleDiscEdit = (discId) => {
    functions.handleEditDisc(discId);
  };

  const createHeader = () => {
    const { enabled, discType: discFlightType, title } = discType;
    if (discFlightType !== null && discFlightType !== undefined && discs.length > 0) {
      if (enabled) {
        return (
          <div className={headerClassName} title={`Hide All ${title}`}>
            <FaEye onClick={handleDisableDiscType} className="fa-eye-icon" />
            &nbsp;&nbsp;{title}
          </div>);
      }
      return (
        <div className={headerClassName} title={`Show All ${title}`}>
          <FaEyeSlash onClick={handleDisableDiscType} className="fa-eye-slash-icon" />&nbsp;&nbsp;{title}
        </div>);
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
                  return (
                    <span title="Click to Hide this Disc" >
                      <FaEye onClick={handleDisableDisc.bind(this, row)} className="fa-eye-icon" />
                    </span>);
                }
                return (
                  <span title="Click to Show this Disc" >
                    <FaEyeSlash onClick={handleDisableDisc.bind(this, row)} className="fa-eye-slash-icon" />
                  </span>);
              },
              width: 25,
            },
            {
              id: 'discDisplayName',
              Header: 'Company',
              accessor: d => ((d.displayName && d.displayName !== '') ? d.displayName : `${d.company} ${d.name}`),
              Cell: row => (row.value),
              className: 'leftAlignCell',
              width: 250,
            },
            {
              Header: 'Edit',
              accessor: 'baggedDiscId',
              width: 25,
              Cell: row => (
                <span title="Click to Edit this Disc" >
                  <FaEdit onClick={handleDiscEdit.bind(this, row.value)} className="fa-edit-icon" />
                </span>
              ),
            },
            {
              Header: 'Remove',
              accessor: 'baggedDiscId',
              width: 25,
              Cell: row => (
                <span title="Click to Remove Disc from Basket" >
                  <FaTrashO onClick={handleDiscRemove.bind(this, row.value)} className="fa-trashO-icon" />
                </span>),
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
      handleRemoveDisc: PropTypes.func,
      handleEditDisc: PropTypes.func,
    }),
  }),
};

export default DiscType;
