import React from "react";
import classes from "./User.css";
import Button from "../../../components/Common/Button/Button";
//import axios from "../../../axios-users";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye} from '@fortawesome/free-regular-svg-icons';
import { faUser} from '@fortawesome/free-solid-svg-icons'

const user = props => (
    <div className={classes.User}>
    {/* <p>{props.id}</p> */}
      <p>{<FontAwesomeIcon icon={faUser}/>} {props.voornaam} {props.achternaam}</p>
      <p>{<FontAwesomeIcon icon={faEye}/>} {props.rechten}</p>
      <span className={classes.Button}>
        <Button clicked={props.editUser} name="wijzig">Wijzig</Button>
        <Button clicked={props.removeUser} name="verwijder">Verwijder</Button>
      </span>
    </div>
  );

export default user;

