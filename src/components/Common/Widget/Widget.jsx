import React, { Component } from "react";

import classes from "./Widget.css";
import Spinner from "../Spinner/Spinner";

class Widget extends Component {
  componentWillUpdate() {
    console.log("[Modal] WillUpdate");
  }

  render() {
    return (
      <>
        <div
          className={[classes.Widget, classes[this.props.wgtType]].join(" ")}
        >
          <h3>{this.props.title}</h3>
          {this.props.loading ? <Spinner /> : ""}
          <div className="content">{this.props.children}</div>
        </div>
      </>
    );
  }
}

export default Widget;
