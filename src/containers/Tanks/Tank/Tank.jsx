import React from "react";
import classes from "./Tank.css";
import Button from "../../../components/Common/Button/Button";
//import axios from "../../../axios-users";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGasPump, faInfoCircle} from '@fortawesome/free-solid-svg-icons'

const tank = props => (
    <div className={classes.Tank}>
    <p>Id: {props.tankId}</p>
      <p>{<FontAwesomeIcon icon={faGasPump}/>} {props.tanknaam}</p>
      <p>{<FontAwesomeIcon icon={faInfoCircle}/>} {props.status}</p>
      <span className={classes.Button}>
        <Button clicked={props.overview}>Overzicht</Button>
        <Button clicked={props.editTank}>Wijzig</Button>
        <Button clicked={props.removeTank}>Verwijder</Button>
      </span>
    </div>
  );

export default tank;
