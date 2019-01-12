import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/update";

const initialState = {
  users: [],
  loading: false,
  // addingUser: false,

  // companyId: null, hoe deze mee te sturen
  // userId: null, hoe deze mee te sturen
  
  // userForm: {
  //   voornaam: {
  //     elementType: "input",
  //     elementConfig: {
  //       type: "text",
  //       placeholder: "Voornaam"
  //     },
  //     value: "",
  //     validation: {
  //       required: true
  //     },
  //     valid: false,
  //     touched: false
  //   },

  //   tussenvoegsel: {
  //     elementType: "input",
  //     elementConfig: {
  //       type: "text",
  //       placeholder: "Tussenvoegsel"
  //     },
  //     value: "",
  //     validation: {
  //       required: false
  //     },
  //     valid: true
  //   },

  //   achternaam: {
  //     elementType: "input",
  //     elementConfig: {
  //       type: "text",
  //       placeholder: "Achternaam"
  //     },
  //     value: "",
  //     validation: {
  //       required: true
  //     },
  //     valid: false,
  //     touched: false
  //   },

  //   geboortedatum: {
  //     elementType: "input",
  //     elementConfig: {
  //       type: "date"
  //     },
  //     value: "",
  //     validation: {
  //       required: true
  //     },
  //     valid: false,
  //     touched: false
  //   },

  //   gebruikersnaam: {
  //     elementType: "input",
  //     elementConfig: {
  //       type: "text",
  //       placeholder: "Gebruikersnaam"
  //     },
  //     value: "",
  //     validation: {
  //       required: true
  //     },
  //     valid: false,
  //     touched: false
  //   },

  //   wachtwoord: {
  //     elementType: "input",
  //     elementConfig: {
  //       type: "password",
  //       placeholder: "Wachtwoord"
  //     },
  //     value: "",
  //     validation: {
  //       required: true,
  //       password: true
  //     },
  //     valid: false,
  //     touched: false,
  //     errorMessage:
  //       "Een wachtwoord moet bestaan uit minimaal 8 karakters, een hoofdletter, kleine letter, nummer en speciaal karakter"
  //   },

  //   email: {
  //     elementType: "input",
  //     elementConfig: {
  //       type: "email",
  //       placeholder: "E-mailadres"
  //     },
  //     value: "",
  //     validation: {
  //       required: true,
  //       email: true
  //     },
  //     valid: false,
  //     touched: false,
  //     errorMessage: "Voer een geldig e-mailadres in"
  //   },

  //   telefoonnummer: {
  //     elementType: "input",
  //     elementConfig: {
  //       type: "tel",
  //       placeholder: "Telefoonnummer"
  //     },
  //     value: "",
  //     validation: {
  //       required: true,
  //       minLength: 10,
  //       maxLength: 15
  //     },
  //     valid: false,
  //     touched: false,
  //     errorMessage: "Voer een geldig telefoonnummer in"
  //   },

  //   rechten: {
  //     label: "Selecteer de rechten",
  //     elementType: "select",
  //     elementConfig: {
  //       options: [
  //         {
  //           value: "Selecteer de rechten",
  //           displayValue: " "
  //         },
  //         {
  //           value: "Medewerker",
  //           displayValue: "Medewerker"
  //         },
  //         {
  //           value: "Functioneel beheerder",
  //           displayValue: "Functioneel beheerder"
  //         },
  //         {
  //           value: "Technisch beheerder",
  //           displayValue: "Technisch beheerder"
  //         }
  //       ]
  //     },
  //     value: "",
  //     validation: {},
  //     valid: false,
  //     touched: false
  //   }
  // },
  // formIsValid: false
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


// add user
const addUserStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const addUserSucces = (state, action) => {
  const newUser = updateObject(action.userData, {
    // userId: action.userId,
    // companyId: action.companyId
  });
  return updateObject(state, {
    loading: false,
    // addingUser: true,
    users: state.users.concat(newUser)
  });
};

const addUserFail = (state, action) => {
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
    case actionTypes.FETCH_USERS_START:
      return fetchUsersStart(state, action);
    case actionTypes.FETCH_USERS_SUCCESS:
      return fetchUsersSucces(state, action);
    case actionTypes.FETCH_USERS_FAIL:
      return fetchUsersFail(state, action);
    case actionTypes.FETCH_USER_BY_ID_START:
      return fetchUserByIdStart(state, action);
    case actionTypes.FETCH_USER_BY_ID_SUCCESS:
      return fetchUserByIdSucces(state, action);
    case actionTypes.FETCH_USER_BY_ID_FAIL:
      return fetchUserByIdFail(state, action);
    case actionTypes.ADD_USER_START:
      return addUserStart(state, action);
    case actionTypes.ADD_USER_SUCCESS:
      return addUserSucces(state, action);
    case actionTypes.ADD_USER_FAIL:
      return addUserFail(state, action);
    case actionTypes.DELETE_USER_BY_ID_START:
      return deleteUserByIdStart(state, action);
    case actionTypes.DELETE_USER_BY_ID_SUCCESS:
      return deleteUserByIdSucces(state, action);
    case actionTypes.DELETE_USER_BY_ID_FAIL:
      return deleteUserByIdFail(state, action);
    default:
      return state;
  }
};

export default reducer;
