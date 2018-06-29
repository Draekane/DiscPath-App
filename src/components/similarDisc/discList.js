import PropTypes from 'prop-types';
import React from 'react';
import ReactTable from 'react-table';
import { FaEyeSlash, FaEye } from 'react-icons/lib/fa';

import { discShape } from '../../propTypeShapes/bagShapes';

const DiscList = (props) => {
  const {
    discs,
    headerClassName,
    title,
    selectedDisc,
    functions,
  } = props.props;

  const createHeader = () => <div className={headerClassName}>&nbsp;&nbsp;{`${title} (total discs: ${discs.length})`}</div>;

  const handleDisableSelectedDisc = () => {
    const { enabled } = selectedDisc;
    functions.handleEnableSelectedDisc(enabled);
  };

  const handleDisableSimilarDisc = (value) => {
    const { original } = value;
    const { discId, enabled } = original;
    functions.handleEnableSimilarDisc(discId, enabled);
  };

  const showSelectedDisc = () => {
    if (selectedDisc) {
      if (selectedDisc.enabled) {
        return (
          <div className="selectedDisc-display">
            <span title="Click to Hide this Disc" >
              <FaEye onClick={handleDisableSelectedDisc} className="fa-eye-icon" />
            </span> {selectedDisc.company} {selectedDisc.name}
          </div>);
      }
      return (
        <div className="selectedDisc-display">
          <span title="Click to Show this Disc" >
            <FaEyeSlash onClick={handleDisableSelectedDisc} className="fa-eye-slash-icon" />
          </span> {selectedDisc.company} {selectedDisc.name}
        </div>);
    }
    return null;
  };

  return (
    <React.Fragment>
      {showSelectedDisc()}
      <ReactTable
        data={discs}
        minRows="0"
        showPagination
        columns={[
          {
            Header: createHeader(),
            headerClassName,
            columns: [
              {
                accessor: 'enabled',
                Cell: (row) => {
                  if (row.value === true) {
                    return (
                      <span title="Click to Hide this Disc" >
                        <FaEye onClick={handleDisableSimilarDisc.bind(this, row)} className="fa-eye-icon" />
                      </span>);
                  }
                  return (
                    <span title="Click to Show this Disc" >
                      <FaEyeSlash onClick={handleDisableSimilarDisc.bind(this, row)} className="fa-eye-slash-icon" />
                    </span>);
                },
                width: 25,
              },
              {
                id: 'discDisplayName',
                accessor: d => `${d.company} ${d.name}`,
                Cell: row => (row.value),
                className: 'leftAlignCell',
                width: 250,
              },
            ],
          },
        ]}
        className="-striped -highlight"
      />
    </React.Fragment>
  );
};

DiscList.propTypes = {
  props: PropTypes.shape({
    discs: PropTypes.arrayOf(discShape),
    headerClassName: PropTypes.string,
    title: PropTypes.string,
    selectedDisc: PropTypes.shape(discShape),
    functions: PropTypes.shape({
      handleEnableSimilarDisc: PropTypes.func,
      handleEnableSelectedDisc: PropTypes.func,
    }),
  }),
};

export default DiscList;
