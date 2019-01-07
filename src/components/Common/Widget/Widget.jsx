import React from "react";

import classes from "./Widget.css";

const Widget = (props) => (
        <div className={classes.Widget}>
          <h4>{props.title}</h4>
          <div className={[classes.Content, classes[props.contentType]].join(" ")}>{props.children}</div>
        </div>
      
    );
  


export default Widget;
