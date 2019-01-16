import React, { Component } from "react";

import classes from "./Home.css";
import Widget from "../../components/Common/Widget/Widget";
import Map from "../Maps/Maps";
import Log from "../../components/Tables/Log/Log";
import Alarm from "../../components/Tables/Alarm/Alarm"

class Home extends Component {
  state = {
    sensordata: [],
    loading: true
  };

  render() {
    return (
      <>
        <h3>Overzicht dashboard</h3>
        <div className={classes.wrapper}>
          <div className={classes.one}>
            <Widget title="Accuniveau" contentType="Number">
              <span>Gesorteerde lijst op accuniveau</span>
            </Widget>
          </div>

          <div className={classes.one}>
            <Widget title="Dieselniveau" contentType="Number">
              <span>Gesorteerde lijst op dieselniveau</span>
            </Widget>
          </div>

          <div className={classes.two}>
            <Widget title="Alarmen">
              <Alarm>{/* log={sensorlogTanks} */}</Alarm>
            </Widget>
          </div>

          <div className={classes.four}>
            <Widget title="Locatie" contentType="Maps">
            <div>
              TODO
            </div>
              <div className={classes.Map}>
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

          <div className={classes.four}>
            <Widget title="Sensorlog">
              <Log>TODO</Log>
            </Widget>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
