import React, { Component } from "react";
import { connect } from "react-redux";
import Map from "../../Maps/Maps";

import classes from "./Overview.css";
import Widget from "../../../components/Common/Widget/Widget";
import Button from "../../../components/Common/Button/Button";
import * as actions from "../../../store/actions/tanks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import Log from "../../../components/Tables/Log/Log";
import LogRow from "../../../components/Tables/Log/LogRow";
import Alarm from "../../../components/Tables/Alarm/Alarm";

class Overview extends Component {
  state = {
    slotstand: 0,
    icon: false,
    open: false
  };

  componentDidMount() {
    this.props.onFetchTankSensorlogById(this.props.match.params.tankId);
    this.props.onFetchTankOverviewById(this.props.match.params.tankId);

    if (this.props.slotStatus) {
      this.setState({ slotstand: 1, icon: true, open: true });
    } else {
      this.setState({ slotstand: 0, icon: false, open: false });
    }            
  }

  //Nakijken
  componentWillUnmount() {
    if (
      this.props.onFetchTankSensorlogById(this.props.match.params.tankId) &&
      this.props.onFetchTankOverviewById(this.props.match.params.tankId)
    ) {
      this.props.onFetchTankSensorlogById.cancel();
      this.props.onFetchTankOverviewById.cancel();
    }
  }

  switchLockCondition = () => {
    if (!this.state.slotstand) {
      this.props.onPostSlotOpen(this.props.dev_id);
    } else {
      this.props.onPostSlotDicht(this.props.dev_id);
    }
    this.setState(prevState => {
      return { slotstand: !prevState.slotstand, icon: !prevState.icon };
    });
  };

  render() {
    let sensorlogTank = null;
    if (!this.props.loading) {
      sensorlogTank = this.props.sensorlogTank.map(log => {
        let ts = new Date(log.timestamp);
        let tijd = ts.toLocaleString();

        return (
          <LogRow
            key={log.sensorLogId}
            sensorLogId={log.sensorLogId}
            accuniveau={log.accuniveau}
            opbreng={log.vermogenZonnepaneel}
            dieselniveau={log.dieselniveau}
            slotstand={log.slotStatus}
            latitude={this.props.lat}
            longitude={this.props.lng}
            tijd={tijd}
          />
        );
      });
    }

    let otStamp = new Date(this.props.openingstijd);
    let openingsuur = otStamp.getUTCHours() + 0 >= 10 ? otStamp.getUTCHours() + 0 : "0" + (otStamp.getUTCHours() + 0);
    let openingsminuut = otStamp.getUTCMinutes() + 0 >= 10 ? otStamp.getUTCMinutes() + 0 : "0" + (otStamp.getUTCMinutes() + 0);
    let openingstijden = openingsuur + ":" + openingsminuut;

    let stStamp = new Date(this.props.sluitingstijd);
    let sluitingsuur = stStamp.getUTCHours() + 0 >= 10 ? stStamp.getUTCHours() + 0 : "0" + (stStamp.getUTCHours() + 0);
    let sluitingsminuut = stStamp.getUTCMinutes() + 0 >= 10 ? stStamp.getUTCMinutes() + 0 : "0" + (stStamp.getUTCMinutes() + 0);
    let sluitingstijden = sluitingsuur + ":" + sluitingsminuut;

    return (
      <>
        <h3>Overzicht tank {this.props.match.params.tankId}</h3>
        <div className={classes.wrapper}>
          <div className={classes.one}>
            <Widget contentType="Number" title="Dieselniveau">
              <span>{this.props.dieselniveau}%</span>
            </Widget>
          </div>

          <div className={classes.one}>
            <Widget contentType="Number" title="Accuniveau">
              <span>{this.props.accuniveau}%</span>
            </Widget>
          </div>

          <div className={classes.one}>
            <Widget contentType="Number" title="Opbreng zonnepaneel">
              <span>{this.props.vermogenZonnepaneel}%</span>
            </Widget>
          </div>

          <div className={classes.three}>
            <Widget title="Alarmen">
              <Alarm>{/* log={sensorlogTanks} */}</Alarm>
            </Widget>
          </div>

          <div className={classes.four}>
            <Widget title="Locatie">
              <div>
                <Map
                  id="myMap"
                  options={{
                    center: {
                      lat: Number(this.props.lat),
                      lng: Number(this.props.lng)
                    },
                    zoom: 8
                  }}
                  onMapLoad={map => {
                    new window.google.maps.Marker({
                      position: {
                        lat: Number( this.props.lat),
                        lng: Number(this.props.lng)
                      },
                      map: map,
                      title: "Tankgegevens" 
                    });
                  }}
                />
              </div>
            </Widget>
          </div>

          <div className={classes.two}>
            <Widget contentType="Number" title="Openingstijden">
              <p>
                <span>Openingstijd: {openingstijden}</span>
              </p>
              <p>
                <span>Sluitingstijd: {sluitingstijden}</span>
              </p>
            </Widget>
          </div>

          <div className={classes.two}>
            <Widget contentType="Slot" title="Slotstand">
              <span>
                <div className={classes.Icon}>
                  {!this.state.icon ? (
                    <FontAwesomeIcon icon={faLock} />
                  ) : (
                    <FontAwesomeIcon icon={faLockOpen} />
                  )}
                </div>
                <Button clicked={this.switchLockCondition}>
                  {!this.state.slotstand ? "Open" : "Sluit"}
                </Button>
              </span>
            </Widget>
          </div>

          <div className={classes.six}>
            <Widget title="Sensorlog">
              <Log log={sensorlogTank} />
            </Widget>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sensorlogTank: state.tanks.sensorlogTank,
    sensorDataTank: state.tanks.sensorDataTank,
    loading: state.tanks.loading,
    error: state.tanks.error,
    token: state.auth.token,

    sensorId: state.tanks.sensorId,
    accuniveau: state.tanks.accuniveau,
    dieselniveau: state.tanks.dieselniveau,
    lat: state.tanks.lat,
    lng: state.tanks.lng,
    vermogenZonnepaneel: state.tanks.vermogenZonnepaneel,
    slotStatus: state.tanks.slotStatus,
    tankId: state.tanks.tankId,
    openingstijd: state.tanks.openingstijd,
    sluitingstijd: state.tanks.sluitingstijd,
    dev_id: state.tanks.dev_id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchTankOverviewById: tankId => dispatch(actions.fetchTankOverviewById(tankId)),
    onFetchTankSensorlogById: tankId => dispatch(actions.fetchTankSensorlogById(tankId)),
    onPostSlotOpen: dev_id => dispatch(actions.postSlotOpen(dev_id)),
    onPostSlotDicht: dev_id => dispatch(actions.postSlotDicht(dev_id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
