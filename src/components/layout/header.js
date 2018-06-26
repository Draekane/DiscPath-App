import PropTypes from 'prop-types';
import React from 'react';

const Header = (props) => {
  const { pageHeader } = props;

  return (
    <header className="topbar clearfix">
      <div className="topbar-left">
        <div className="logo">
          <header className="App-header grid-item-header">
            <h1 className="App-title">{pageHeader}</h1>
              To report problems or offer suggestions&nbsp;
            <a
              href="https://github.com/MichaelPalmer-Orange/DiscPath-App/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="help-request"
            >click here
            </a><br />
              To view documentation and ask questions&nbsp;
            <a
              href="https://discpath.readme.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="help-request"
            >click here
            </a>
          </header>
        </div>
      </div>
    </header>);
};

Header.propTypes = {
  pageHeader: PropTypes.string,
};

Header.defaultProps = {
  pageHeader: 'DiscPath Bag Builder',
};

export default Header;
