import React from "react";

const logRow = props => (
      <tr>
        <td>{props.sensorLogId}</td>
        <td>{props.accuniveau}</td>
        <td>{props.opbreng}</td>
        <td>{props.dieselniveau}</td>
        <td>{props.slotstand}</td>
        <td>{props.latitude}</td>
        <td>{props.longitude}</td>
        <td>{props.tijd}</td>
      </tr>
)

export default logRow;