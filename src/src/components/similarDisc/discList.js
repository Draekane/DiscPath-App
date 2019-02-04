import PropTypes from 'prop-types';
import React from 'react';
import ReactTable from 'react-table';
import { FaEyeSlash, FaEye, FaEdit } from 'react-icons/lib/fa';

import { discShape, throwerShape } from '../../propTypeShapes/bagShapes';
import EditDiscModal from '../../components/modals/editDiscModal';

const DiscList = (props) => {
  const {
    discs,
    headerClassName,
    title,
    selectedDisc,
    thrower,
    functions,
    similarDiscEditModal,
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

  const handleSelectDiscOpenModal = () => {
    functions.handleSimilarDiscEdit();
  };

  const showSelectedDisc = () => {
    if (selectedDisc) {
      if (selectedDisc.enabled) {
        return (
          <div className="selectedDisc-display">
            <span title="Click to Hide this Disc" >
              <FaEye onClick={handleDisableSelectedDisc} className="fa-eye-icon greenFill" />
            </span> {selectedDisc.company} {selectedDisc.name} - ({getDiscType(selectedDisc.type)})&nbsp;&nbsp;&nbsp;
            <span title="Click to Edit this Disc" >
              <FaEdit className="fa-edit-icon greenFill" onClick={handleSelectDiscOpenModal} />
            </span>
          </div>);
      }
      return (
        <div className="selectedDisc-display">
          <span title="Click to Show this Disc" >
            <FaEyeSlash onClick={handleDisableSelectedDisc} className="fa-eye-slash-icon greyFill" />
          </span> {selectedDisc.company} {selectedDisc.name} - ({getDiscType(selectedDisc.type)})&nbsp;&nbsp;&nbsp;
          <span title="Click to Edit this Disc" >
            <FaEdit className="fa-edit-icon greenFill" onClick={handleSelectDiscOpenModal} />
          </span>
        </div>);
    }
    return null;
  };

  const getDiscType = (discType) => {
    switch (discType) {
      case 'D':
        return 'Distance Driver';
      case 'F':
        return 'Fairway Driver';
      case 'M':
        return 'Midrange';
      case 'P':
        return 'Putt & Approach';
      default:
        return 'Unknown';
    }
  };

  const modalOptions = {
    editDisc: similarDiscEditModal ? selectedDisc : null,
    thrower,
    disableNameEdit: true,
    hideThrowType: true,
    functions: {
      closeModal: functions.handleSimilarDiscEdit,
      changeDiscWear: functions.handleSimilarDiscEditWear,
      changeDiscWeight: functions.handleSimilarDiscEditWeight,
      changeDiscPower: functions.handleSimilarDiscEditPower,
      changeDiscColor: functions.handleSimilarDiscEditColor,
    },
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
                        <FaEye onClick={handleDisableSimilarDisc.bind(this, row)} className="fa-eye-icon greenFill" />
                      </span>);
                  }
                  return (
                    <span title="Click to Show this Disc" >
                      <FaEyeSlash
                        onClick={handleDisableSimilarDisc.bind(this, row)}
                        className="fa-eye-slash-icon greyFill"
                      />
                    </span>);
                },
                width: 25,
              },
              {
                id: 'discDisplayName',
                accessor: d => `${d.company} ${d.name} - (${getDiscType(d.type)})`,
                Cell: row => (row.value),
                className: 'leftAlignCell',
                width: 250,
              },
            ],
          },
        ]}
        className="-striped -highlight"
      />
      <EditDiscModal props={modalOptions} />
    </React.Fragment>
  );
};

DiscList.propTypes = {
  props: PropTypes.shape({
    discs: PropTypes.arrayOf(discShape),
    headerClassName: PropTypes.string,
    title: PropTypes.string,
    selectedDisc: PropTypes.shape(discShape),
    similarDiscEditModal: PropTypes.bool,
    thrower: PropTypes.shape(throwerShape),
    functions: PropTypes.shape({
      handleEnableSimilarDisc: PropTypes.func,
      handleEnableSelectedDisc: PropTypes.func,
      handleSimilarDiscEdit: PropTypes.func,
      handleSimilarDiscEditWeight: PropTypes.func,
      handleSimilarDiscEditWear: PropTypes.func,
      handleSimilarDiscEditPower: PropTypes.func,
    }),
  }),
};

export default DiscList;
