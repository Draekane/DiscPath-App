import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import _ from 'lodash';
import { FaClose } from 'react-icons/lib/fa';

const ImportExport = ({
  importFunction,
  exportFunction,
  openModal,
  closeModal,
}) => {
  const handleImportOnChange = (selectorFiles) => {
    const reader = new FileReader();
    _.forEach(selectorFiles, (file) => {
      reader.onload = () => {
        const fileData = reader.result;
        importFunction(JSON.parse(fileData));
      };
      reader.readAsText(file);
    });
  };

  const handleExportOnClick = () => {
    exportFunction();
  };

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    content: {
      top: '25%',
      left: '25%',
      width: '25%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-20%',
      transform: 'translate(-20%, -20%)',
      border: 'none',
    },
  };

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <FaClose onClick={closeModal} color="red" style={{ float: 'right', 'z-index': '100' }} />
      <div className="title-block" >
          Import / Export Bag
      </div>
      <div className="import-export-container" >
        <div className="import-container" >
          <input
            type="button"
            className="import-bag-button"
            id="button"
            value="Import Bag From File"
          />
          <input
            type="file"
            className="import-bag-select"
            accept=".json"
            onChange={e => handleImportOnChange(e.target.files)}
          />
        </div>
        <div className="export-container" >
          <button id="exportBag" name="exportBag" onClick={handleExportOnClick} >Export Bag to File</button>
        </div>
      </div>
    </Modal>);
};

ImportExport.propTypes = {
  importFunction: PropTypes.func,
  exportFunction: PropTypes.func,
  openModal: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default ImportExport;

