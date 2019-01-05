import React from "react";
import classes from "./Search.css";

const search = props => (
  <input
    type="search"
    className={classes.Search}
    onChange={props.changed}
    placeholder={"Zoek..."}
  />
);

export default search;
