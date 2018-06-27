import PropTypes from 'prop-types';
import React from 'react';
import { FaExclamationTriangle, FaQuestionCircle, FaDatabase } from 'react-icons/lib/fa';

const Header = (props) => {
  const { pageHeader } = props;

  return (
    <header className="topbar clearfix">
      <div className="topbar-left">
        <div className="logo">
          <header className="App-header grid-item-header">
            <h1 className="App-title">{pageHeader}</h1>
            <FaExclamationTriangle className="fa-exclamation-triangle-icon" />  To report problems or offer suggestions&nbsp;
            <a
              href="https://github.com/MichaelPalmer-Orange/DiscPath-App/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="help-request"
            >click here
            </a><br />
            <FaQuestionCircle className="fa-question-circle-icon" />  To view documentation and ask questions&nbsp;
            <a
              href="https://discpath.readme.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="help-request"
            >click here
            </a><br />
            <FaDatabase className="fa-database-icon" />  Disc flight information from&nbsp;
            <a
              href="http://www.inboundsdiscgolf.com/content/?page_id=431"
              target="_blank"
              rel="noopener noreferrer"
              className="help-request"
            >Inbounds Disc Golf InFlight Guide
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
