import * as actionTypes from "./actionTypes";
import axios from "../../axios-users";

// fetch all users
const fetchUsersStart = () => {
  return {
    type: actionTypes.FETCH_USERS_START
  };
};

const fetchUsersSucces = users => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    users: users
  };
};

const fetchUsersFail = error => {
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
            // userId: key
          });
        }
        dispatch(fetchUsersSucces(fetchedUsers));
      })
      .catch(error => {
        dispatch(fetchUsersFail(error));
      });
  };
};

// Add user
const addUserStart = () => {
  return {
    type: actionTypes.ADD_USER_START
  };
};

// const addUserSucces = (userData, userId, companyId) => {
//   return {
//     type: actionTypes.ADD_USER_SUCCESS,
//     userData: userData,
//     userId: userId,
//     companyId: companyId
//   };
// };

const addUserSucces = (userData) => {
  return {
    type: actionTypes.ADD_USER_SUCCESS,
    userData: userData,
  };
};

const addUserFail = error => {
  return {
    type: actionTypes.ADD_USER_FAIL,
    error: error
  };
};

// bedrijfsid erbij? : response.data.
export const addUser = userData => {
  return dispatch => {
    dispatch(addUserStart());
    axios
      .post("/users.json", userData) //endpoint
      .then(response => {
        console.log(response.data.name);
        dispatch(addUserSucces(response.data.name, userData));
      })
      .catch(error => {
        dispatch(addUserFail(error));
      });
  };
};

//TODO Fetch one user by id
const fetchUserByIdStart = () => {
  return {
    type: actionTypes.FETCH_USER_BY_ID_START
  };
};

const fetchUserByIdSucces = id => {
  return {
    type: actionTypes.FETCH_USER_BY_ID_SUCCESS,
    id: id
  };
};

const fetchUserByIdFail = error => {
  return {
    type: actionTypes.FETCH_USER_BY_ID_FAIL,
    error: error
  };
};

export const fetchUserById = id => {
  return dispatch => {
    dispatch(fetchUserByIdStart());
    axios
      .get("todo")
      .then(user => {
        dispatch(fetchUserByIdSucces(user.data));
        console.log(user);
      })
      .catch(error => {
        dispatch(fetchUserByIdFail(error));
      });
  };
};

// Edit user
export const editUser = userId => {
  return {
    type: actionTypes.EDIT_USER,
    userId: userId
  };
};

// Remove user
const deleteUserByIdStart = () => {
  return {
    type: actionTypes.DELETE_USER_BY_ID_START
  };
};

const deleteUserByIdSucces = (users, userId) => {
  return {
    type: actionTypes.DELETE_USER_BY_ID_SUCCESS,
    users: users,
    userId: userId
  };
};

const deleteUserByIdFail = error => {
  return {
    type: actionTypes.DELETE_USER_BY_ID_FAIL,
    error: error
  };
};

export const deleteUser = userId => {
  return dispatch => {
    dispatch(deleteUserByIdStart());
    axios
      .delete("todo")
      .then(response => {
        dispatch(deleteUserByIdSucces(response));
        dispatch(fetchUsers());
        console.log(response);
      })
      .catch(error => {
        dispatch(deleteUserByIdFail(error));
      });
  };
};
