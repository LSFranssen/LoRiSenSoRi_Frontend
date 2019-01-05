import React from "react";

import classes from "./Toolbar.css";
import ToolbarItems from "./ToolbarItems/ToolbarItems";
import Logo from "../../../components/Common/Logo/Logo";
import Toggler from "../Sidebar/Toggler/Toggler";

const toolbar = props => (
  <header className={classes.Toolbar}>
    <Toggler clicked={props.togglerClicked}/>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav>
      <ToolbarItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;
