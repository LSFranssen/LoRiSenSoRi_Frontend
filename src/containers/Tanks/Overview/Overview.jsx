import React, { Component } from "react";
import { connect } from "react-redux";
import Map from "../../Maps/Maps";

import classes from "./Overview.css";
import Widget from "../../../components/Common/Widget/Widget";
import Button from "../../../components/Common/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

class Overview extends Component {
  state = {
    sensorData: [],
    // tankId: null,
    accuniveau: 10,
    accuspanning: 20,
    slotstand: true,
    dieselniveau: 90,
    loading: true,
    icon: true,
    lat: "41.0082",
    lng: "28.9784"
  };

  switchLockCondition = () => {
    this.setState(prevState => {
      return {
        slotstand: !prevState.slotstand,
        icon: !prevState.icon
      };
    });
  };

  render() {
    return (
      <>
        <h3>Overzicht {this.props.tankId}</h3>
        <div className={classes.wrapper}>
          <div className={classes.one}>
            <Widget contentType="Number" title="Dieselniveau">
              <span>{this.state.dieselniveau}%</span>
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
          <div className={classes.four}>
            <Widget title="Locatie">
              <div>
                <Map
                  id="myMap"
                  options={{
                    center: { lat: 41.0082, lng: 28.9784 },
                    zoom: 8
                  }}
                  onMapLoad={map => {
                    new window.google.maps.Marker({
                      position: { lat: 41.0082, lng: 28.9784 },
                      map: map,
                      title: "Hello Istanbul!"
                    });
                  }}
                />
              </div>
            </Widget>
          </div>
          <div className={classes.one}>
            <Widget contentType="Slot" title="Slotstand">
              <span>
                <div className={classes.Icon}>
                  {this.state.icon ? (
                    <FontAwesomeIcon icon={faLock} />
                  ) : (
                    <FontAwesomeIcon icon={faLockOpen} />
                  )}
                </div>
                <Button clicked={this.switchLockCondition}>
                  {this.state.slotstand ? "Open" : "Sluit"}
                </Button>
              </span>
            </Widget>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    // tanks: state.tanks.tanks,
    loading: state.tanks.loading,
    // token: state.auth.token,
    tankId: state.tanks.tankId
  };
};

export default connect(mapStateToProps)(Overview);
