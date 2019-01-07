import React, { Component } from "react";
// import { withRouter } from "react-router-dom";

import classes from "./Overview.css";
import Widget from "../../../components/Common/Widget/Widget";
import Logo from "../../../components/Common/Logo/Logo";
import Button from "../../../components/Common/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

class Overview extends Component {
  state = {
    sensorData: [],
    tankId: null,
    accuniveau: 10,
    accuspanning: 20,
    slotstand: true,
    dieselniveau: 90,
    loading: true,
    icon: true
  };

  switchLockCondition = () => {
    this.setState(prevState => {
      return {
        slotstand: !prevState.slotstand,
        icon: !prevState.icon,
      };
    });
  };

  render() {
    return (
      <>
        <h3>Overzicht {this.props.tanknaam}</h3>
        <div className={classes.wrapper}>
          <div className={classes.one}>
            <Widget contentType="Number" title="Dieselniveau">
              <span>{this.state.dieselniveau}%</span>
            </Widget>
          </div>
          <div className={classes.one}>
            <Widget contentType="Slot" title="Slotstand">
              <span>
                <div className={classes.Icon}>
                  {this.state.icon ? <FontAwesomeIcon icon={faLock}/>  : <FontAwesomeIcon icon={faLockOpen}/> }
                </div>
                <Button clicked={this.switchLockCondition}>
                  {this.state.slotstand ? "Open" : "Sluit"}
                </Button>
              </span>
            </Widget>
          </div>
          <div className={classes.one}>
            <Widget contentType="Number" title="Accuniveau">
              <span>{this.state.accuniveau}%</span>
            </Widget>
          </div>
          <div className={classes.one}>
            <Widget contentType="Number" title="Accuspanning">
              <span>{this.state.accuspanning}%</span>
            </Widget>
          </div>
          <div className={classes.two}>
            <Widget title="Locatie">
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

export default Overview;
