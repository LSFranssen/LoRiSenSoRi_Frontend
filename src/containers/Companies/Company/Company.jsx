import React from "react";
import classes from "./Company.css";
import Button from "../../../components/Common/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

const company = props => (
  <div className={classes.Company}>
    <p>{<FontAwesomeIcon icon={faBuilding} />} {props.bedrijfsnaam}</p>
    <p>{<FontAwesomeIcon icon={faLocationArrow} />} {props.straatnaam} {props.huisnummer} {props.huisnummerToevoeging} , {props.postcode}, {props.plaats}
    </p>
    <span className={classes.Button}>
      <Button clicked={props.editCompany}>Wijzig</Button>
      <Button clicked={props.removeCompany}>Verwijder</Button>
    </span>
  </div>
);

export default company;
