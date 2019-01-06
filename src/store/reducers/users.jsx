import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/update";

const initialState = {
  users: [],
  loading: false,
  error: false
  //   addingUser: false,
};

const fetchUsersStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchUsersSucces = (state, action) => {
  return updateObject(state, {
    users: action.users,
    loading: false
  });
};

const fetchUsersFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_START: return fetchUsersStart(state, action);
    case actionTypes.FETCH_USERS_SUCCES: return fetchUsersSucces(state, action);
    case actionTypes.FETCH_USERS_FAIL: return fetchUsersFail(state, action);
    default: return state;
  }
};

export default reducer;
