import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';

const Navbar = (props) => {
  return (
    <Toolbar style={{background: "#fff"}}>
      <ToolbarGroup>
        <ToolbarTitle text="Kiwi Skypicker" />
      </ToolbarGroup>
      <ToolbarGroup>
        <a target="__blank" href="https://github.com/saragg/skypicker">
          <FontIcon className="fa fa-github" />
        </a>
      </ToolbarGroup>
    </Toolbar>
  )
}

export default Navbar;