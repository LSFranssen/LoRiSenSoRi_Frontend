import React, { Component } from "react";

import classes from "./Home.css";
import Widget from "../../components/Common/Widget/Widget";
import Map from "../Maps/Maps";

class Home extends Component {
  state = {
    sensordata: [],
    loading: true
  };

  render() {
    return (
      <>
        <h3>Overzicht dashboard</h3>
        <section className={classes.Container}>
          <div className={classes.one}>
            <Widget title="Iets" contentType="Number">
              <span>accuniveau</span>
            </Widget>
          </div>
          <div className={classes.two}>
            <Widget title="Nog iets" contentType="Number">
              <span>...liter</span>
            </Widget>
          </div>
          <div className={classes.three}>
            <Widget title="Iets" contentType="Number">
              <span>accuniveau</span>
            </Widget>
          </div>
          <div className={classes.four}>
            <Widget title="Nog iets" contentType="Number">
              <span>...liter</span>
            </Widget>
          </div>
          <div className={classes.five}>
            <Widget title="Locatie" contentType="Maps">
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
        </section>
      </>
    );
  }
}

export default Home;
