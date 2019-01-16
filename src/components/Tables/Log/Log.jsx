import React from "react";

import classes from "./Log.css";

const log = props => (
        <table className={classes.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Accuniveau</th>
              <th>Opbreng zonnepaneel</th>
              <th>Dieselniveau</th>
              <th>Slotstand</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Datum en tijd</th>
            </tr>
          </thead>
          <tbody>{props.log}</tbody>
        </table>
    );

export default log;
