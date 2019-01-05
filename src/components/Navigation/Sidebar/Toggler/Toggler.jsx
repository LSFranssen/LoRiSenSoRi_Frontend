import React from 'react';
import classes from './Toggler.css';

const toggler = ( props ) => (
    <div className={classes.Toggler} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);
 
export default toggler;




