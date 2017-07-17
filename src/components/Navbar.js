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
        <FontIcon className="fa fa-github" />
      </ToolbarGroup>
    </Toolbar>
  )
}

export default Navbar;