import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const APPNAV_ROUTES = [
  {
    navTitle: 'Bag Setup',
    path: '/bagSetup',
    id: 'bagSetupLink',
  },
  {
    navTitle: 'Similar Disc',
    path: '/similarDisc',
    id: 'similarDiscLink',
  },
];

class SideBar extends React.Component {
  buildNavBarItem({ RoutePermissions, FeatureFlags }, route = null, index = 0) {
    if (route === null) {
      return [];
    }

    const navbarItems = [];
    const navKey = `nav_${index + 1}`;
    navbarItems.push(<li key={navKey} className="list-title">{route.navTitle}</li>);

    const childRoutes = [];
    if (route.routes) {
      route.routes.forEach((childRoute) => {
        if (this.userHasFeaturePermissions(childRoute.feature, FeatureFlags) &&
            this.userHasRoutePermissions(RoutePermissions, route.permissions)) {
          const childNavKey = `ChildNavKey_${childRoute.path}`;
          childRoutes.push(
            <li key={childNavKey}>
              <Link
                to={childRoute.path}
                target={childRoute.linkType === 'external' ? childRoute.target : null}
              >{childRoute.navTitle}
              </Link>
            </li>);
        }
      });
    }

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
          <img alt={route.image.src} src={route.image.src} />
          <span className="list-label">{route.navTitle}</span>
        </Link>
      </li>);

    return navbarItems;
  }

  configureNavbar() {
    const navbarItems = [];
    APPNAV_ROUTES.forEach((route, index) => {
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
