import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Backpack from '../../img/Backpack_White.png';
import SimilarDisc from '../../img/SimilarDisc_White.png';

const APPNAV_ROUTES = [
  {
    navTitle: 'Bag Setup',
    path: 'bagSetup',
    image: {
      src: Backpack,
      altText: 'Backpack_White.png',
    },
  },
  {
    navTitle: 'Similar Disc',
    path: '/similarDisc',
    image: {
      src: SimilarDisc,
      altText: 'SimilarDisc_White.png',
    },
  },
];

class SideBar extends React.Component {
  buildNavBarItem(route = null, index = 0) {
    if (route === null) {
      return [];
    }

    const navbarItems = [];
    // const navKey = `nav_${index + 1}`;
    // navbarItems.push(<li key={navKey} >{route.navTitle}</li>);

    const menuNavKey = `menu_nav_${index + 1}`;

    const currentLocation = _.lowerCase(window.location.pathname);
    const itemRoute = _.lowerCase(route.path);
    const routeClass = (currentLocation === itemRoute) ? 'nav-image active' : 'nav-image';
    navbarItems.push(
      <li
        className={routeClass}
        key={menuNavKey}
      >
        <Link to={route.path} >
          <img alt={route.image.altText} src={route.image.src} />
          <span className="list-label">{route.navTitle}</span>
        </Link>
      </li>);

    return navbarItems;
  }

  configureNavbar() {
    const navbarItems = [];
    _.forEach(APPNAV_ROUTES, (route, index) => {
      const items = this.buildNavBarItem(route, index);
      navbarItems.push(...items);
    });

    return navbarItems;
  }
  render() {
    const navbarItems = this.configureNavbar();

    return (
      <aside className="sidebar">
        <ul className="list-accordion">
          {navbarItems}
        </ul>
      </aside>
    );
  }
}

export default SideBar;
