import React from "react";

import classes from "./Alarm.css";

const alarm = props => (
        <table className={classes.table}>
          <thead>
            <tr>
              <th>TankID</th>
              <th>AlarmId</th>
              <th>Melding</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Tijd</th>
            </tr>
          </thead>
          <tbody>{props.alarm}</tbody>
        </table>
    );

export default alarm;
