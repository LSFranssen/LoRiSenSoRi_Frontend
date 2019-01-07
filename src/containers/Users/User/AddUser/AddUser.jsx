import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./AddUser.css";
import Button from "../../../../components/Common/Button/Button";
import Input from "../../../../components/Common/Input/Input";
import Spinner from "../../../../components/Common/Spinner/Spinner";
import axios from "../../../../axios-users";
import withErrorHandler from "../../../../hoc/withErrorHandler/withErrorHandler";
import { checkValidation } from "../../../../shared/validation";
import { updateObject } from "../../../../shared/update";
import Form from "../../../../components/Form/Form";
import * as actions from "../../../../store/actions/index";

class AddUser extends Component {
  state = {
    // companyId: null, hoe deze mee te sturen
    // userId: null, hoe deze mee te sturen
    userForm: {
      voornaam: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Voornaam"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      tussenvoegsel: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Tussenvoegsel"
        },
        value: "",
        validation: {
          required: false
        },
        valid: true
      },

      achternaam: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Achternaam"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      geboortedatum: {
        elementType: "input",
        elementConfig: {
          type: "date"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      gebruikersnaam: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Gebruikersnaam"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      wachtwoord: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Wachtwoord"
        },
        value: "",
        validation: {
          required: true,
          password: true
        },
        valid: false,
        touched: false,
        errorMessage:
          "Een wachtwoord moet bestaan uit minimaal 8 karakters, een hoofdletter, kleine letter, nummer en speciaal karakter"
      },

      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "E-mailadres"
        },
        value: "",
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        errorMessage: "Voer een geldig e-mailadres in"
      },

      telefoonnummer: {
        elementType: "input",
        elementConfig: {
          type: "tel",
          placeholder: "Telefoonnummer"
        },
        value: "",
        validation: {
          required: true,
          minLength: 10,
          maxLength: 15
        },
        valid: false,
        touched: false,
        errorMessage: "Voer een geldig telefoonnummer in"
      },

      rechten: {
        label: "Selecteer de rechten",
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "Selecteer de rechten",
              displayValue: " "
            },
            {
              value: "Medewerker",
              displayValue: "Medewerker"
            },
            {
              value: "Functioneel beheerder",
              displayValue: "Functioneel beheerder"
            },
            {
              value: "Technisch beheerder",
              displayValue: "Technisch beheerder"
            }
          ]
        },
        value: "",
        validation: {},
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    loading: false,
   // loadUser: null,
  };

  componentDidMount() {
    if (this.props.match.params.id === "edit-user") {
      this.props.onFetchUser();
    //   axios
    //     .get("/users/-LV3m8D5JfVVkKoKrtv6.json")
    //     .then(users => {
    //       // const fetchedUsers = [];
    //       // for (let key in users.data) {
    //       //   fetchedUsers.push({
    //       //     ...users.data[key],
    //       //     id: key
    //       //   });
    //       // }
    //       this.setState({ loading: false, users: users.data });
    //       console.log(users);
    //       console.log("users.voornaam: " + users.data.userData.voornaam);
    //       console.log("users.achternaam: " + users.data.userData.achternaam);
    //     })
    //     .catch(error => {
    //       this.setState({ loading: false });
    //     });
     }
  }

  saveAddUserHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.userForm) {
      formData[formElementIdentifier] = this.state.userForm[formElementIdentifier].value;
    }
    const user = {
      userData: formData,
      // userId: userId
    };
    axios
      .post("/users.json", user) //endpoint
      .then(response => {
        console.log(response);
        this.setState({ loading: false });
        this.props.history.push("/users");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  cancelAddUserHandler = () => {
    this.props.history.push("/users");
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedUserFormElement = updateObject(
      this.state.userForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidation(
          event.target.value,
          this.state.userForm[inputIdentifier].validation
        ),
        touched: true
      }
    );
    const updatedUserForm = updateObject(this.state.userForm, {
      [inputIdentifier]: updatedUserFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedUserForm) {
      formIsValid = updatedUserForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ userForm: updatedUserForm, formIsValid: formIsValid });
  };

  render() {
    const title = (
      <h3>
        {this.props.match.params.id === "add-user"
          ? "Toevoegen gebruiker"
          : "Wijzigen gebruiker"}
      </h3>
    );

    const formElementsArray = [];
    for (let key in this.state.userForm) {
      formElementsArray.push({
        id: key,
        setup: this.state.userForm[key]
      });
    }
    let form = (
      <Form onSubmit={this.saveAddUserHandler}>
        {title}
        {formElementsArray.map(formElement => (
          <Input
            label={formElement.setup.label}
            key={formElement.id}
            elementType={formElement.setup.elementType}
            elementConfig={formElement.setup.elementConfig}
            value={formElement.setup.value}
            //  value={this.state.userForm.achternaam.value}
            invalid={!formElement.setup.valid}
            schouldValidate={formElement.setup.validation}
            touched={formElement.setup.touched}
            errorMessage={formElement.setup.errorMessage}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <section className={classes.Button}>
          <Button
            clicked={this.saveAddUserHandler}
            disabled={!this.state.formIsValid}
          >
            Opslaan
          </Button>
          <Button clicked={this.cancelAddUserHandler}>Annuleren</Button>
        </section>
      </Form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return <div>{form}</div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchUser: (id) => dispatch(actions.fetchUserById(id)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(withErrorHandler(AddUser, axios)));




// redux
//________________________________________________
// __________________________________
// import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";

// import classes from "./AddUser.css";
// import Button from "../../../../components/Common/Button/Button";
// import Input from "../../../../components/Common/Input/Input";
// import Spinner from "../../../../components/Common/Spinner/Spinner";
// import axios from "../../../../axios-users";
// import withErrorHandler from "../../../../hoc/withErrorHandler/withErrorHandler";
// import { checkValidation } from "../../../../shared/validation";
// import { updateObject } from "../../../../shared/update";
// import Form from "../../../../components/Form/Form";
// import * as actions from "../../../../store/actions/index";

// class AddUser extends Component {
//   state = {
//     companyId: null,
//     userId: null,
//     userForm: {
//       voornaam: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           placeholder: "Voornaam"
//         },
//         value: "",
//         validation: {
//           required: true
//         },
//         valid: false,
//         touched: false
//       },

//       tussenvoegsel: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           placeholder: "Tussenvoegsel"
//         },
//         value: "",
//         validation: {
//           required: false
//         },
//         valid: true
//       },

//       achternaam: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           placeholder: "Achternaam"
//         },
//         value: "",
//         validation: {
//           required: true
//         },
//         valid: false,
//         touched: false
//       },

//       geboortedatum: {
//         elementType: "input",
//         elementConfig: {
//           type: "date"
//         },
//         value: "",
//         validation: {
//           required: true
//         },
//         valid: false,
//         touched: false
//       },

//       gebruikersnaam: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           placeholder: "Gebruikersnaam"
//         },
//         value: "",
//         validation: {
//           required: true
//         },
//         valid: false,
//         touched: false
//       },

//       wachtwoord: {
//         elementType: "input",
//         elementConfig: {
//           type: "password",
//           placeholder: "Wachtwoord"
//         },
//         value: "",
//         validation: {
//           required: true,
//           password: true
//         },
//         valid: false,
//         touched: false,
//         errorMessage:
//           "Een wachtwoord moet bestaan uit minimaal 8 karakters, een hoofdletter, kleine letter, nummer en speciaal karakter"
//       },

//       email: {
//         elementType: "input",
//         elementConfig: {
//           type: "email",
//           placeholder: "E-mailadres"
//         },
//         value: "",
//         validation: {
//           required: true,
//           email: true
//         },
//         valid: false,
//         touched: false,
//         errorMessage: "Voer een geldig e-mailadres in"
//       },

//       telefoonnummer: {
//         elementType: "input",
//         elementConfig: {
//           type: "tel",
//           placeholder: "Telefoonnummer"
//         },
//         value: "",
//         validation: {
//           required: true,
//           minLength: 10,
//           maxLength: 15
//         },
//         valid: false,
//         touched: false,
//         errorMessage: "Voer een geldig telefoonnummer in"
//       },

//       rechten: {
//         label: "Selecteer de rechten",
//         elementType: "select",
//         elementConfig: {
//           options: [
//             {
//               value: "Selecteer de rechten",
//               displayValue: " "
//             },
//             {
//               value: "Medewerker",
//               displayValue: "Medewerker"
//             },
//             {
//               value: "Functioneel beheerder",
//               displayValue: "Functioneel beheerder"
//             },
//             {
//               value: "Technisch beheerder",
//               displayValue: "Technisch beheerder"
//             }
//           ]
//         },
//         value: "",
//         validation: {},
//         valid: false,
//         touched: false
//       }
//     },
//     formIsValid: false,
//    //  loading: false,
//    // loadUser: null,
//   //  userId: null
//   };

//   componentDidMount() {
//     if (this.props.match.params.id === "edit-user") {
//       this.props.onFetchUser();
//     //   axios
//     //     .get("/users/-LV3m8D5JfVVkKoKrtv6.json")
//     //     .then(users => {
//     //       // const fetchedUsers = [];
//     //       // for (let key in users.data) {
//     //       //   fetchedUsers.push({
//     //       //     ...users.data[key],
//     //       //     id: key
//     //       //   });
//     //       // }
//     //       this.setState({ loading: false, users: users.data });
//     //       console.log(users);
//     //       console.log("users.voornaam: " + users.data.userData.voornaam);
//     //       console.log("users.achternaam: " + users.data.userData.achternaam);
//     //     })
//     //     .catch(error => {
//     //       this.setState({ loading: false });
//     //     });
//      }
//   }

//   saveAddUserHandler = event => {
//     event.preventDefault();
//     // this.setState({ loading: true });
//     const formData = {};
//     for (let formElementIdentifier in this.state.userForm) {
//       formData[formElementIdentifier] = this.state.userForm[formElementIdentifier].value;
//     }
//     const user = {
//       userData: formData,
//     };
//     this.props.onAddUser(user);
//     // axios
//     //   .post("/users.json", user) //endpoint
//     //   .then(response => {
//     //     console.log(response);
//     //     this.setState({ loading: false });
//     //     this.props.history.push("/users");
//     //   })
//     //   .catch(error => {
//     //     this.setState({ loading: false });
//     //   });
//   };

//   cancelAddUserHandler = () => {
//     this.props.history.push("/users");
//   };

//   inputChangedHandler = (event, inputIdentifier) => {
//     const updatedUserFormElement = updateObject(
//       this.state.userForm[inputIdentifier],
//       {
//         value: event.target.value,
//         valid: checkValidation(
//           event.target.value,
//           this.state.userForm[inputIdentifier].validation
//         ),
//         touched: true
//       }
//     );
//     const updatedUserForm = updateObject(this.state.userForm, {
//       [inputIdentifier]: updatedUserFormElement
//     });

//     let formIsValid = true;
//     for (let inputIdentifier in updatedUserForm) {
//       formIsValid = updatedUserForm[inputIdentifier].valid && formIsValid;
//     }
//     this.setState({ userForm: updatedUserForm, formIsValid: formIsValid });
//   };

//   render() {
//     const title = (
//       <h3>
//         {this.props.match.params.id === "add-user"
//           ? "Toevoegen gebruiker"
//           : "Wijzigen gebruiker"}
//       </h3>
//     );

//     const formElementsArray = [];
//     for (let key in this.state.userForm) {
//       formElementsArray.push({
//         id: key,
//         setup: this.state.userForm[key]
//       });
//     }
//     let form = (
//       <Form onSubmit={this.saveAddUserHandler}>
//         {title}
//         {formElementsArray.map(formElement => (
//           <Input
//             label={formElement.setup.label}
//             key={formElement.id}
//             elementType={formElement.setup.elementType}
//             elementConfig={formElement.setup.elementConfig}
//             value={formElement.setup.value}
//             //  value={this.state.userForm.achternaam.value}
//             invalid={!formElement.setup.valid}
//             schouldValidate={formElement.setup.validation}
//             touched={formElement.setup.touched}
//             errorMessage={formElement.setup.errorMessage}
//             changed={event => this.inputChangedHandler(event, formElement.id)}
//           />
//         ))}
//         <section className={classes.Button}>
//           <Button
//             clicked={this.saveAddUserHandler}
//             disabled={!this.state.formIsValid}
//           >
//             Opslaan
//           </Button>
//           <Button clicked={this.cancelAddUserHandler}>Annuleren</Button>
//         </section>
//       </Form>
//     );

//     if (this.props.loading) {
//       form = <Spinner />;
//     }

//     return <div>{form}</div>;
//   }
// }

// const mapStateToProps = state => {
//   return {
//     // userForm: state.users.userForm,
//     loading: state.users.loading,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onFetchUser: (id) => dispatch(actions.fetchUserById(id)),
//     onAddUser: (userData) => dispatch(actions.addUser(userData))

//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(AddUser, axios)));