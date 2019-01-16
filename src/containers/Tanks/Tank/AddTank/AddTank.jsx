import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./AddTank.css";
import Button from "../../../../components/Common/Button/Button";
import Input from "../../../../components/Common/Input/Input";
import Spinner from "../../../../components/Common/Spinner/Spinner";
import axios from "../../../../axios-users";
import withErrorHandler from "../../../../hoc/withErrorHandler/withErrorHandler";
import { checkValidation } from "../../../../shared/validation";
import Form from "../../../../components/Form/Form";
import * as actions from "../../../../store/actions/index";
import { updateObject } from "../../../../shared/update";

class AddTank extends Component {
  state = {
    tankForm: {
      tanknummer: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Tanknummer"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: "Voer een tanknummer in"
      },

      tanknaam: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Naam"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: "Voer een tanknaam in"
      },

      type: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Type"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: "Voer een type in"
      },

      bouwjaar: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Bouwjaar"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: "Voer een bouwjaar in"
      },

      inhoudLiters: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Inhoud in liters"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: "Voer de inhoud in"
      },

      diameter: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Diameter in millimeters"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: "Voer de diameter van de tank in"
      },

      lengte: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Lengte in millimeters"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: "Voer de lengte van de tank in"
      },

      gewicht: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Leeg gewicht in kilo's"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: "Voer het gewicht van de tank in"
      },

      openingstijd: {
        label: "Openingstijd",
        elementType: "input",
        elementConfig: {
          type: "time",
          placeholder: "Openingstijd"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: "Voer de openingstijden van de tank in"
      },

      sluitingstijd: {
        label: "Sluitingstijd",
        elementType: "input",
        elementConfig: {
          type: "time",
          placeholder: "Sluitingstijd"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: "Voer de sluitingstijden van de tank in"
      },

      meldingTanken: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Percentage leeg voor melding"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: "Voer het percentage van het dieselniveau in"
      },

      status: {
        label: "Selecteer de status",
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "Selecteer de status",
              displayValue: " "
            },
            {
              value: "INGEBRUIK",
              displayValue: "In gebruik"
            },
            {
              value: "NONACTIEF",
              displayValue: "Non-actief"
            },
            {
              value: "INREPARATIE",
              displayValue: "In reparatie"
            }
          ]
        },
        value: "",
        validation: {},
        valid: false,
        touched: false
      }
    },
    formIsValid: false
  };

  componentDidMount() {
    if (this.props.match.params.tankId) {
      this.props.onFetchTankById(this.props.match.params.tankId);
    }
  }

  saveAddTankHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.tankForm) {
      formData[formElementIdentifier] = this.state.tankForm[
        formElementIdentifier
      ].value;
    }
    const tank = {
      tankData: formData,
    };

    if (this.props.match.params.tankId) {
      // put maken
      console.log("wijzigen");
    } else {
      this.props.onAddTank(tank);
      console.log("Toevoegen");
      console.log(tank);
    }
  };

  cancelAddTankHandler = () => {
    this.props.history.push("/tanks");
  };

  // wijzigen naar updateobject
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedTankFormElement = updateObject(
      this.state.tankForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidation(
          event.target.value,
          this.state.tankForm[inputIdentifier].validation
        ),
        touched: true
      }
    );
    const updatedTankForm = updateObject(this.state.tankForm, {
      [inputIdentifier]: updatedTankFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedTankForm) {
      formIsValid = updatedTankForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ tankForm: updatedTankForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    const title = (
      <h3>{this.props.match.params.tankId ? "Wijzigen tank" : "Toevoegen tank"}</h3>
    );

    for (let key in this.state.tankForm) {
      formElementsArray.push({
        id: key,
        setup: this.state.tankForm[key]
      });
    }
    let form = (
      <Form onSubmit={this.saveAddTankHandler}>
        {title}
        {formElementsArray.map(formElement => (
          <Input
            label={formElement.setup.label}
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
        ))}
        <section className={classes.Button}>
          <Button
            clicked={this.saveAddTankHandler}
            disabled={!this.state.formIsValid}
          >
            Opslaan
          </Button>
          <Button clicked={this.cancelAddTankHandler}>Annuleer</Button>
        </section>
      </Form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }
    return <div>{form}</div>;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.tanks.loading,
    tank: state.tanks.tank,
    bouwjaar: state.tanks.bouwjaar,
    diameter: state.tanks.diameter,
    gewicht: state.tanks.gewicht,
    inhoud: state.tanks.inhoud,
    lengte: state.tanks.lengte,
    meldingTanken: state.tanks.meldingTanken,
    openingstijd: state.tanks.openingstijd,
    sluitingstijd: state.tanks.sluitingstijd,
    status: state.tanks.status,
    tankId: state.tanks.tankId,
    tanknaam: state.tanks.tanknaam,
    tanknummer: state.tanks.tanknummer,
    type: state.tanks.type
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddTank: tankData => dispatch(actions.addTank(tankData)),
    onFetchTankById: tankId => dispatch(actions.fetchTankById(tankId))
    // put erbij
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(AddTank, axios)));
