import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/Common/Input/Input";
import Button from "../../components/Common/Button/Button";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/Common/Spinner/Spinner";
import { checkValidation } from "../../shared/validation";
import { updateObject } from "../../shared/update";

class Auth extends Component {
  state = {
    loginForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Emailadres"
        },
        value: "",
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        errorMessage: "Voer een geldige gebruikersnaam in"
      },

      password: {
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
        errorMessage: "Voer uw wachtwoord in"
      }
    }
  };

  inputChangedHandler = (event, loginFormName) => {
    const updatedLoginForm = updateObject(this.state.loginForm, {
      [loginFormName]: updateObject(this.state.loginForm[loginFormName], {
        value: event.target.value,
        valid: checkValidation(
          event.target.value,
          this.state.loginForm[loginFormName].validation
        ),
        touched: true
      }) 
    });
    this.setState({ loginForm: updatedLoginForm });
  };

  loginHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.loginForm.email.value,
      this.state.loginForm.password.value
    );
  };

  render() {
    const formElementsArray = [];

    for (let key in this.state.loginForm) {
      formElementsArray.push({
        id: key,
        setup: this.state.loginForm[key]
      });
    }

    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.setup.elementType}
        elementConfig={formElement.setup.elementConfig}
        value={formElement.setup.value}
        invalid={!formElement.setup.valid}
        schouldValidate={formElement.setup.validation}
        touched={formElement.setup.touched}
        errorMessage={formElement.setup.errorMessage}
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    // aanpassen aan backend ivm meldingen --> mappen
    // let errorMessage = null;
    // if (this.props.error) {
    //   errorMessage = (
    //     <p>{this.props.error.message}</p>
    //   )
    // }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/home" />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        <h3>Login</h3>
        <form onSubmit={this.loginHandler}>
          {form}
          <section className={classes.Button}>
            <Button clicked={this.loginHandler}>Inloggen</Button>
            <Button clicked={this.cancelLoginHandler}>Annuleren</Button>
          </section>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
