import * as actionTypes from "./actionTypes";
import axios from "../../axios-users";

// Fetch all tanks
export const fetchTanksStart = () => {
  return {
    type: actionTypes.FETCH_TANKS_START
  };
};

export const fetchTanksSucces = tanks => {
  return {
    type: actionTypes.FETCH_TANKS_SUCCESS,
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

// Remove tank
const deleteTankByIdStart = () => {
  return {
    type: actionTypes.DELETE_TANK_BY_ID_START
  };
};

const deleteTankByIdSucces = (tanks, id) => {
  return {
    type: actionTypes.DELETE_TANK_BY_ID_SUCCESS,
    tanks: tanks,
    id: id
  };
};

const deleteTankByIdFail = error => {
  return {
    type: actionTypes.DELETE_TANK_BY_ID_FAIL,
    error: error
  };
};

export const deleteTank = id => {
  return dispatch => {
    dispatch(deleteTankByIdStart());
    axios
      .delete("/tanks/" + id + ".json")
      .then(response => {
        dispatch(deleteTankByIdSucces(response));
        dispatch(fetchTanks());
        console.log(response);
      })
      .catch(error => {
        dispatch(deleteTankByIdFail(error));
      });
  };
};
