import React from "react";

import classes from "./SidebarItems.css";
import NavigationItem from "../../NavigationItem/NavigationItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBuilding, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faChartBar } from "@fortawesome/free-regular-svg-icons";

const sidebarItems = ( props ) => (
  <ul className={classes.SidebarItems} >
    {props.isAuthenticated ? <NavigationItem link="/home" exact icon={<FontAwesomeIcon icon={faHome}/>}>Home</NavigationItem> : null}  
    {props.isAuthenticated ? <NavigationItem link="/tanks" icon={<FontAwesomeIcon icon={faChartBar}/>}>Tanks</NavigationItem>  : null}
    {props.isAuthenticated ? <NavigationItem link="/companies" icon={<FontAwesomeIcon icon={faBuilding}/>}>Bedrijven</NavigationItem> : null}
    {props.isAuthenticated ? <NavigationItem link="/users" icon={<FontAwesomeIcon icon={faUsers}/>}>Gebruikers</NavigationItem> : null}
    <NavigationItem link="/overige" icon={<FontAwesomeIcon icon={faPaperPlane}/>}>Overige</NavigationItem>
  </ul>
);

export default sidebarItems;
