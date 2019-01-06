import * as actionTypes from "./actionTypes";
import axios from "../../axios-users";

export const fetchUsersStart = () => {
    return {
      type: actionTypes.FETCH_USERS_START
    };
  };

export const fetchUsersSucces = users => {
  return {
    type: actionTypes.FETCH_USERS_SUCCES,
    users: users
  };
};

export const fetchUsersFail = error => {
  return {
    type: actionTypes.FETCH_USERS_FAIL,
    error: error
  };
};

export const fetchUsers = () => {
  return dispatch => {
    dispatch(fetchUsersStart());
    axios
      .get("/users.json")
      .then(users => {
        const fetchedUsers = [];
        for (let key in users.data) {
          fetchedUsers.push({
            ...users.data[key],
            id: key
          });
        }
        dispatch(fetchUsersSucces(fetchedUsers));
      })
      .catch(error => {
        dispatch(fetchUsersFail(error));
      });
  };
};
