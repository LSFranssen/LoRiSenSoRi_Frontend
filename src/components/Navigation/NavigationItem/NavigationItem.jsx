import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItem.css";

const navigationItem = props => (
  <li className={classes.NavigationItem}>
    <NavLink to={props.link} exact={props.exact}>
      <div className={classes.Icon}>{props.icon}</div>
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;

