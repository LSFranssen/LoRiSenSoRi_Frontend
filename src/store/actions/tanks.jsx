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
      .get("http://localhost:9004/api/tank/")
      .then(tanks => {
        const fetchedTanks = [];
        for (let key in tanks.data) {
          fetchedTanks.push({
            ...tanks.data[key]
            // tankId: key
          });
          console.log(tanks.data[key].tankId);
        }
        dispatch(fetchTanksSucces(fetchedTanks));
      })
      .catch(error => {
        dispatch(fetchTanksFail(error));
      });
  };
};

// Add tank
const addTankStart = () => {
  return {
    type: actionTypes.ADD_TANK_START
  };
};

const addTankSucces = (tankData) => {
  return {
    type: actionTypes.ADD_TANK_SUCCESS,
    tankData: tankData,
  };
};

const addTankFail = error => {
  return {
    type: actionTypes.ADD_TANK_FAIL,
    error: error
  };
};

// bedrijfsid erbij? : response.data.
export const addTank = tankData => {
  return dispatch => {
    dispatch(addTankStart());
    axios
      .post("http://localhost:9004/api/tank/create", tankData) //endpoint
      .then(response => {
        // console.log(response.data.name);
        dispatch(addTankSucces(tankData));
      })
      .catch(error => {
        dispatch(addTankFail(error));
      });
  };
};

// // bedrijfsid erbij? : response.data.
// export const addTank = (tanknummer, tanknaam, type, bouwjaar, inhoud, diameter, lengte, gewicht, openingstijd, sluitingstijd, status) => {
//   let tank = {
//     tanknummer: tanknummer,
//     tanknaam: tanknaam,
//     type: type,
//     bouwjaar: bouwjaar,
//     inhoudLiters: inhoud,
//     diameter: diameter,
//     lengte: lengte,
//     gewicht: gewicht,
//     openingstijd: openingstijd,
//     sluitingstijd: sluitingstijd,
//     status: status
//   }
//   return dispatch => {
//     dispatch(addTankStart());
//     axios
//       .post("http://localhost:9004/api/tank/create", tank) //endpoint
//       .then(response => {
//         // console.log(response.data.name);
//         dispatch(addTankSucces(tank));
//       })
//       .catch(error => {
//         dispatch(addTankFail(error));
//       });
//   };
// };

//Fetch one tank by id
const fetchTankByIdStart = () => {
  return {
    type: actionTypes.FETCH_TANK_BY_ID_START
  };
};

const fetchTankByIdSucces = tank => {
  return {
    type: actionTypes.FETCH_TANK_BY_ID_SUCCESS,
    tank: tank
  };
};

const fetchTankByIdFail = error => {
  return {
    type: actionTypes.FETCH_TANK_BY_ID_FAIL,
    error: error
  };
};

export const fetchTankById = tankId => {
  return dispatch => {
    dispatch(fetchTankByIdStart());
    axios
      .get("http://localhost:9004/api/tank/" + tankId)
      .then(tank => {
        dispatch(fetchTankByIdSucces(tank.data));
        console.log(tank);
        console.log(tank.data.bouwjaar);
      })
      .catch(error => {
        dispatch(fetchTankByIdFail(error));
      });
  };
};

// fetch laatste sensordata per tank
const fetchTankOverviewByIdStart = () => {
  return {
    type: actionTypes.FETCH_TANK_OVERVIEW_BY_ID_START
  };
};

const fetchTankOverviewByIdSucces = sensorDataTank => {
  return {
    type: actionTypes.FETCH_TANK_OVERVIEW_BY_ID_SUCCESS,
    sensorDataTank: sensorDataTank
  };
};

const fetchTankOverviewByIdFail = error => {
  return {
    type: actionTypes.FETCH_TANK_OVERVIEW_BY_ID_FAIL,
    error: error
  };
};

export const fetchTankOverviewById = tankId => {
  return dispatch => {
    dispatch(fetchTankOverviewByIdStart());
    axios
      .get("http://localhost:9004/api/tank/laatstesensorgegevens/" + tankId)
      .then(sensorDataTank => {
        dispatch(fetchTankOverviewByIdSucces(sensorDataTank.data));
        console.log(sensorDataTank);
      })
      .catch(error => {
        dispatch(fetchTankOverviewByIdFail(error));
      });
  };
};

// fetch sensorlog per tank
const fetchTankSensorlogByIdStart = () => {
  return {
    type: actionTypes.FETCH_TANK_SENSORLOG_BY_ID_START
  };
};

const fetchTankSensorlogByIdSucces = sensorlogTank => {
  return {
    type: actionTypes.FETCH_TANK_SENSORLOG_BY_ID_SUCCESS,
    sensorlogTank: sensorlogTank
  };
};

const fetchTankSensorlogByIdFail = error => {
  return {
    type: actionTypes.FETCH_TANK_SENSORLOG_BY_ID_FAIL,
    error: error
  };
};

export const fetchTankSensorlogById = tankId => {
  return dispatch => {
    dispatch(fetchTankSensorlogByIdStart());
    axios
      .get("http://localhost:9004/api/tank/sensorlog/" + tankId)
      .then(sensorlogTank => {
        const fetchedlogs = [];
        for (let key in sensorlogTank.data) {
          fetchedlogs.push({
            ...sensorlogTank.data[key],
             sensorLogId: key
          });
        }
        dispatch(fetchTankSensorlogByIdSucces(sensorlogTank.data));
        console.log(sensorlogTank[0].data);
      })
      .catch(error => {
        dispatch(fetchTankSensorlogByIdFail(error));
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
      .delete("http://localhost:9004/api/tank/" + tankId)
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

// post slotstatus
const postSlotStatusStart = () => {
  return {
    type: actionTypes.POST_SLOTSTATUS_TANK_START
  };
};

const postSlotStatusSuccess = (slotStatus) => {
  return {
    type: actionTypes.POST_SLOTSTATUS_TANK_SUCCESS,
    slotStatus: slotStatus
  };
};

const postSlotStatusFail = error => {
  return {
    type: actionTypes.POST_SLOTSTATUS_TANK_FAIL,
    error: error
  };
};

export const postSlotOpen = (dev_id) => {
  let downlink = {
   downlink: {
   dev_id: dev_id,
    bytes: [0, 1]
  }
   }
 
  return dispatch => {
    dispatch(postSlotStatusStart());
    axios
      .post("http://localhost:9004/api/tank/downlink", downlink)
      .then(response => {
        dispatch(postSlotStatusSuccess(response));
        console.log(response);
      })
      .catch(error => {
        dispatch(postSlotStatusFail(error));
      });
    }
  }
  
  export const postSlotDicht = (dev_id) => {
    let downlink = {
     downlink: {
      dev_id: dev_id,
      bytes: [0, 0]
     }
    }
    return dispatch => {
      dispatch(postSlotStatusStart());
      axios
        .post("http://localhost:9004/api/tank/downlink", downlink)
        .then(response => {
          dispatch(postSlotStatusSuccess(response));
          console.log(response);
        })
        .catch(error => {
          dispatch(postSlotStatusFail(error));
        });
      }
    }