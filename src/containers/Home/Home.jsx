import React, { Component } from "react";

import classes from "./Home.css";
import Widget from "../../components/Common/Widget/Widget";
import Logo from "../../components/Common/Logo/Logo";

class Home extends Component {
  state = {
    loading: true
  };

  render() {
    return (
      <>
        <h3>Overzicht dashboard</h3>
        <div className={classes.wrapper}>
          <div className={classes.three}>
            <Widget title="Iets">
              <span>accuniveau</span>
            </Widget>
          </div>
          <div className={classes.four}>
            <Widget title="Nog iets">
              <span>...liter</span>
            </Widget>
          </div>
          <div className={classes.one}>
            <Widget title="Googlemaps">
              <div className={classes.Logo}>
                <Logo />
              </div>
            </Widget>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
