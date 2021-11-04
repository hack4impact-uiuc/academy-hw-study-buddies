import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import '../css/NavBar.scss';

function NavBar() {
  return (
    <Menu className="navbar" attached="top" borderless size="large">
      <Menu.Menu position="right">
        <Menu.Item className="nav-item" as={NavLink} to="/">
          Studying Activity
        </Menu.Item>
        <Menu.Item className="nav-item" as={NavLink} to="/classes">
          Classes
        </Menu.Item>
        <Menu.Item className="nav-item" as={NavLink} to="/profile">
          Profile
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default NavBar;
