import React from "react";

import classes from "./Widget.css";

const widget = (props) => (
        <div className={classes.Widget}>
        <header><h4>{props.title}</h4></header>
          <div className={[classes.Content, classes[props.contentType]].join(" ")}>{props.children}</div>
        </div>
    );
  
export default widget;