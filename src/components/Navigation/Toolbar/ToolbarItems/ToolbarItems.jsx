import React from "react";

import classes from "./ToolbarItems.css";
import NavigationItem from "../../NavigationItem/NavigationItem";

const toolbarItems = props => (
  <ul className={classes.ToolbarItems}>
    {!props.isAuthenticated ? (
      <NavigationItem className="Left" link="/authenticate">Inloggen</NavigationItem>) : (
      <NavigationItem className="Right" link="/logout">Uitloggen</NavigationItem>
    )}
  </ul>
);

export default toolbarItems;
