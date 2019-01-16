import React from "react";
import classes from "./Search.css";

const search = ({onSearch}) => {
  const handleChange = e => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="search"
      className={classes.Search}
      onChange={handleChange}
      placeholder={"Zoek...TODO"}
    />
  );
};
export default search;
