import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/update";

const initialState = {
  users: [],
  loading: false,
  companyId: null,
  userId: null, 
};

// fetch all users
const fetchUsersStart = state => {
  return updateObject(state, { loading: true });
};

const fetchUsersSucces = (state, action) => {
  return updateObject(state, {
    users: action.users,
    loading: false
  });
};

const fetchUsersFail = state => {
  return updateObject(state, { loading: false });
};

// add user
const addUserStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const addUserSucces = (state, action) => {
  const newUser = updateObject(action.userData) 
  return updateObject(state, {
    loading: false,
    users: state.users.concat(newUser)
  });
};

const addUserFail = (state, action) => {
  return updateObject(state, { loading: false });
};


// fetch user by id
const fetchUserByIdStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchUserByIdSucces = (state, action) => {
  return updateObject(state, {
    userForm: action.user,
    id: action.userId,
    loading: false
  });
};

const fetchUserByIdFail = (state, action) => {
  return updateObject(state, { loading: false });
};

// delete user
const deleteUserByIdStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const deleteUserByIdSucces = (state, action) => {
  const updatedUsers = state.users.filter(user => user.id !== action.id);
  return updateObject(state, {
    loading: false,
    users: updatedUsers
  });
};

const deleteUserByIdFail = state => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_START: return fetchUsersStart(state, action);
    case actionTypes.FETCH_USERS_SUCCESS: return fetchUsersSucces(state, action);
    case actionTypes.FETCH_USERS_FAIL: return fetchUsersFail(state, action);

    case actionTypes.ADD_USER_START: return addUserStart(state, action);
    case actionTypes.ADD_USER_SUCCESS: return addUserSucces(state, action);
    case actionTypes.ADD_USER_FAIL: return addUserFail(state, action);

    case actionTypes.FETCH_USER_BY_ID_START: return fetchUserByIdStart(state, action);
    case actionTypes.FETCH_USER_BY_ID_SUCCESS: return fetchUserByIdSucces(state, action);
    case actionTypes.FETCH_USER_BY_ID_FAIL: return fetchUserByIdFail(state, action);

    case actionTypes.DELETE_USER_BY_ID_START: return deleteUserByIdStart(state, action);
    case actionTypes.DELETE_USER_BY_ID_SUCCESS: return deleteUserByIdSucces(state, action);
    case actionTypes.DELETE_USER_BY_ID_FAIL: return deleteUserByIdFail(state, action);
    default: return state;
  }
};

export default reducer;
