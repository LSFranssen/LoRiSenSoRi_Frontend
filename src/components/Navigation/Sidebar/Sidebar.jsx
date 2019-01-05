import React from "react";

import classes from "./Sidebar.css";
import SidebarItems from "./SidebarItems/SidebarItems";
import Backdrop from "../../Common/Backdrop/Backdrop";

const Sidebar = props => {
  let attachedClasses = [classes.Sidebar, classes.Close];
  if (props.open) {
    attachedClasses = [classes.Sidebar, classes.Open];
  }
  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <nav>
          <SidebarItems isAuthenticated={props.isAuth}/>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
