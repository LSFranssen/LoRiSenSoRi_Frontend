import * as actionTypes from "./actionTypes";
import axios from "../../axios-users";

export const fetchTanksStart = () => {
    return {
      type: actionTypes.FETCH_TANKS_START
    };
  };

export const fetchTanksSucces = tanks => {
  return {
    type: actionTypes.FETCH_TANKS_SUCCES,
    tanks: tanks
  };
};

export const fetchTanksFail = error => {
  return {
    type: actionTypes.FETCH_TANKS_FAIL,
    error: error
  };
};

export const fetchTanks = () => {
  return dispatch => {
    dispatch(fetchTanksStart());
    axios
      .get("/tanks.json")
      .then(tanks => {
        const fetchedTanks = [];
        for (let key in tanks.data) {
          fetchedTanks.push({
            ...tanks.data[key],
            id: key
          });
        }
        dispatch(fetchTanksSucces(fetchedTanks));
      })
      .catch(error => {
        dispatch(fetchTanksFail(error));
      });
  };
};


