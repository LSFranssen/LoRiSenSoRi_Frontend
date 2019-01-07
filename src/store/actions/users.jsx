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

//TODO
export const fetchUserByIdStart = () => {
  return {
    type: actionTypes.FETCH_USER_BY_ID_START
  };
};

export const fetchUserByIdSucces = id => {
  return {
    type: actionTypes.FETCH_USER_BY_ID_SUCCES,
    id: id
  };
};

export const fetchUserByIdFail = error => {
  return {
    type: actionTypes.FETCH_USER_BY_ID_FAIL,
    error: error
  };
};

export const addUserStart = () => {
  return {
    type: actionTypes.ADD_USER_START
  }
}

export const addUserSucces = (userData, userId, companyId) => {
  return {
    type: actionTypes.ADD_USER_SUCCES,
    userData: userData,
    userId: userId,
    companyId: companyId
  };
};

export const addUserFail = error => {
  return {
    type: actionTypes.ADD_USER_FAIL,
    error: error
  };
};

// bedrijfsid erbij? : response.data.
export const addUser = ( userData) => {
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

export const editUser = id => {
  return {
    type: actionTypes.EDIT_USER,
    id: id
  };
};

export const removeUser = () => {
  return {
    type: actionTypes.REMOVE_USER
  };
};

// export const handleChangeUserform = () => {
//   return {
//     type: actionTypes.HANDLE_CHANGE_USERFORM
//   }
// }

export const fetchUserById = id => {
  return dispatch => {
    dispatch(fetchUserByIdStart());
    axios
      .get("/users/" + id + ".json")
      .then(user => {
        dispatch(fetchUserByIdSucces(user.data));
        console.log(user.data);
      })
      .catch(error => {
        dispatch(fetchUserByIdFail(error));
      });
  };
};




