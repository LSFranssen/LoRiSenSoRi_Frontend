import React from "react";

import classes from "./Widget.css";

const widget = (props) => (
        <div className={classes.Widget}>
        <header><h4>{props.title}</h4></header>
          <div className={[classes.Content, classes[props.contentType]].join(" ")}>{props.children}</div>
        </div>
    );
  
export default widget;


// import React from "react";

// import classes from "./Widget.css";

// const Widget = props => (
//   <div className={classes.Widget}>
//     <div className={classes.header}>
//       <h4>{props.title}</h4>
//     </div>
//     <section>
//       <div className={[classes.Content, classes[props.contentType]].join(" ")}>
//         {props.children}
//       </div>
//     </section>
//   </div>
// );

// export default Widget;