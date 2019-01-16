import React from "react";

const alarmRow = props => (
  <tr>
    <td>{props.tankId}</td>
    <td>{props.alarmLogId}</td>
    <td>{props.dieselniveau}</td>
    <td>{props.slotstand}</td>
    <td>{props.latitude}</td>
    <td>{props.longitude}</td>
    <td>{props.tijd}</td>
  </tr>
);

export default alarmRow;
