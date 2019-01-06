import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/update";

const initialState = {
  tanks: [],
  loading: false,
  error: false
  //   addingUser: false,
};

const fetchTanksStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchTanksSucces = (state, action) => {
  return updateObject(state, {
    tanks: action.tanks,
    loading: false
  });
};

const fetchTanksFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TANKS_START: return fetchTanksStart(state, action);
    case actionTypes.FETCH_TANKS_SUCCES: return fetchTanksSucces(state, action);
    case actionTypes.FETCH_TANKS_FAIL: return fetchTanksFail(state, action);
    default: return state;
  }
};

export default reducer;
