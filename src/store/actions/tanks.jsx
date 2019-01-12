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
      .get("http://localhost:9004/api/tank/" 
        )
      .then(tanks => {
        const fetchedTanks = [];
        for (let key in tanks.params) {
          fetchedTanks.push({
            ...tanks.params[key],
            tankId: key
          });
          console.log(tanks.data[key].tankId)
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

const deleteTankByIdSucces = (tanks, tankId) => {
  return {
    type: actionTypes.DELETE_TANK_BY_ID_SUCCESS,
    tanks: tanks,
    tankId: tankId
  };
};

const deleteTankByIdFail = error => {
  return {
    type: actionTypes.DELETE_TANK_BY_ID_FAIL,
    error: error
  };
};

export const deleteTank = tankId => {
  return dispatch => {
    dispatch(deleteTankByIdStart());
    axios
      .delete("/tanks/" + tankId)
      .then(response => {
        dispatch(deleteTankByIdSucces(response));
        dispatch(fetchTanks());
        console.log(response.data);
      })
      .catch(error => {
        dispatch(deleteTankByIdFail(error));
      });
  };
};
