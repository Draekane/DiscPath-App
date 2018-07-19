import PropTypes from 'prop-types';
import React from 'react';

const LeftHeader = (props) => {
  const { pageHeader } = props;

  return (
        <div className="logo">
          <header className="App-header">
            <h1 className="App-title">{pageHeader}</h1>
          </header>
        </div>);
};

LeftHeader.propTypes = {
  pageHeader: PropTypes.string,
};

LeftHeader.defaultProps = {
  pageHeader: 'DiscPath Bag Builder',
};

export default LeftHeader;
