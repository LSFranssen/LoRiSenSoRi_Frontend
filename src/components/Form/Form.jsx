import React from "react";
import classes from "./Form.css";

const form = (props) => <form className={classes.Form}>{props.children}</form>;

export default form;
