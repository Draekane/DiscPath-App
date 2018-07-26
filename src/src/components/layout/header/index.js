import React from 'react';
import LeftHeader from './leftHeader';
import RightHeader from './rightHeader';

const Header = () => (
  <header className="topbar clearfix">
    <div className="topbar-left">
      <LeftHeader />
    </div>
    <div className="topbar-right">
      <RightHeader />
    </div>
  </header>
);

export default Header;
