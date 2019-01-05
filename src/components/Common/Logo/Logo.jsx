import React from "react";
import classes from "./Logo.css";
import Logo from "../../../assets/images/talk2iot_nobg.png";

const logo = props => (
  <div className={classes.Logo}>
    <img src={Logo} alt="Talk2IoT" />
  </div>
);

export default logo;
