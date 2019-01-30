import React from 'react';
import Popup from 'reactjs-popup';
import {
  FaExclamationTriangle,
  FaQuestionCircle,
  FaDatabase,
  FaMoney,
  FaPaypal,
  FaEnvelope,
} from 'react-icons/lib/fa';

const RightHeader = () => (
  <header className="App-header">
    <Popup
      trigger={<div className="right-header-item">Donate <FaMoney className="fa-money-icon greenFill" /></div>}
      position="bottom left"
      on="click"
      closeOnDocumentClick
      mouseLeaveDelay={300}
      mouseEnterDelay={0}
      contentStyle={{ padding: '0px', border: 'none' }}
      arrow={false}
    >
      <div className="menu-items">
        <a
          href="https://www.patreon.com/draekane"
          target="_blank"
          rel="noopener noreferrer"
          className="help-request"
        ><FaMoney className="fa-money-icon greenFill" /> Support us on Patreon<br />(recurring donation)
        </a>
      </div>
      <div className="menu-items">
        <a
          href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SKQTBGHU4S2KC"
          target="_blank"
          rel="noopener noreferrer"
          className="help-request"
        ><FaPaypal className="fa-paypal-icon blueFill" /> Donate via PayPal<br />(one-time donation)
        </a>
      </div>
    </Popup>
    <Popup
      trigger={<div className="right-header-item">Contact Us <FaEnvelope className="fa-envelope-icon blueIcon" /></div>}
      position="bottom left"
      on="click"
      closeOnDocumentClick
      mouseLeaveDelay={300}
      mouseEnterDelay={0}
      contentStyle={{ padding: '0px', border: 'none' }}
      arrow={false}
    >
      <div className="menu-items">
        <a
          href="https://github.com/MichaelPalmer-Orange/DiscPath-App/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="help-request"
        ><FaExclamationTriangle className="fa-exclamation-triangle-icon redFill" /> Report a Problem / Offer Suggestions
        </a>
      </div>
      <div className="menu-items">
        <a
          href="https://discpath.readme.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="help-request"
        ><FaQuestionCircle className="fa-question-circle-icon greenFill" /> View Documentation / Ask Questions
        </a>
      </div>
      <div className="menu-items">
        <a
          href="http://www.inboundsdiscgolf.com/content/?page_id=431"
          target="_blank"
          rel="noopener noreferrer"
          className="help-request"
        ><FaDatabase className="fa-database-icon greyFill" /> Disc flight information from Inbounds Disc Golf InFlight Guide
        </a>
      </div>
    </Popup>
  </header>);

export default RightHeader;
