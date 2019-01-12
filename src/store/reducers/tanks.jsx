import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/update";

const initialState = {
  tanks: [],
  loading: false,
  tankId: null
};

// fetch all tanks
const fetchTanksStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchTanksSucces = (state, action) => {
  return updateObject(state, {
    tanks: action.tanks,
    loading: false,
    tankId: action.tanks.tankId
  });
};

const fetchTanksFail = (state, action) => {
  return updateObject(state, { loading: false });
};

// delete tank
const deleteTankByIdStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const deleteTankByIdSucces = (state, action) => {
  const updatedTanks = state.tanks.filter(tank => tank.tankId !== action.tankId);
  return updateObject(state, {
    loading: false,
    tanks: updatedTanks
  });
};

const deleteTankByIdFail = state => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TANKS_START:
      return fetchTanksStart(state, action);
    case actionTypes.FETCH_TANKS_SUCCESS:
      return fetchTanksSucces(state, action);
    case actionTypes.FETCH_TANKS_FAIL:
      return fetchTanksFail(state, action);
    case actionTypes.DELETE_TANK_BY_ID_START:
      return deleteTankByIdStart(state, action);
    case actionTypes.DELETE_TANK_BY_ID_SUCCESS:
      return deleteTankByIdSucces(state, action);
    case actionTypes.DELETE_TANK_BY_ID_FAIL:
      return deleteTankByIdFail(state, action);
    default:
      return state;
  }
};

export default reducer;
