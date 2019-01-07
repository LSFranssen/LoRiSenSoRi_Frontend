import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/update";

const initialState = {
  users: [],
  loading: false,
  // error: false,
  // userId: null,
  // addingUser: false,
};

const fetchUsersStart = (state) => {
  return updateObject(state, { loading: true });
};

const fetchUsersSucces = (state, action) => {
  return updateObject(state, {
    users: action.users,
    loading: false
  });
};

const fetchUsersFail = (state) => {
  return updateObject(state, { loading: false });
};

//TODO
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

const addUserStart = (state, action) => {
  return updateObject( state, { loading: true })
}

const addUserSucces = (state, action) => {
  const newUser = updateObject (action.userData, {userId: action.userId, companyId: action.companyId});
  return updateObject( state, {
    loading: false,
    // addingUser: true,
    users: state.users.concat(newUser)
  })
}

const addUserFail = (state, action) => {
  return updateObject( state, {loading: false})
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_START: return fetchUsersStart(state, action);
    case actionTypes.FETCH_USERS_SUCCES: return fetchUsersSucces(state, action);
    case actionTypes.FETCH_USERS_FAIL: return fetchUsersFail(state, action);
    case actionTypes.FETCH_USER_BY_ID_START: return fetchUserByIdStart(state, action);
    case actionTypes.FETCH_USER_BY_ID_SUCCES: return fetchUserByIdSucces(state, action);
    case actionTypes.FETCH_USER_BY_ID_FAIL: return fetchUserByIdFail(state, action);
    case actionTypes.ADD_USER_START: return addUserStart(state, action);
    case actionTypes.ADD_USER_SUCCES: return addUserSucces(state, action);
    case actionTypes.ADD_USER_FAIL: return addUserFail(state, action);
    default: return state;
  }
};

export default reducer;



