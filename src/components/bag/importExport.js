import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const ImportExport = (props) => {
  const handleImportOnChange = (selectorFiles) => {
    const { importFunction } = props;
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
    const { exportFunction } = props;
    exportFunction();
  };

  return (
    <React.Fragment>
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
    </React.Fragment>);
};

ImportExport.propTypes = {
  importFunction: PropTypes.func,
  exportFunction: PropTypes.func,
};

export default ImportExport;

