import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import classes from "./AddTank.css";
import Button from "../../../../components/Common/Button/Button";
import Input from "../../../../components/Common/Input/Input";
import Spinner from "../../../../components/Common/Spinner/Spinner";
import axios from "../../../../axios-users";
import withErrorHandler from "../../../../hoc/withErrorHandler/withErrorHandler";
import { checkValidation } from "../../../../shared/validation";
import Form from "../../../../components/Form/Form";

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
          required: false
        },
        valid: false,
        touched: false
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
        valid: true,
        touched: false
      },

      tanktype: {
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
        touched: false
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
        touched: false
      },
      
      inhoud: {
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
        touched: false
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
        touched: false
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
        touched: false
      },

      gewicht: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Gewicht in kilo's"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
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
        touched: false
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
        touched: false
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
              value: "In gebruik",
              displayValue: "In gebruik"
            },
            {
              value: "Non-actief",
              displayValue: "Non-actief"
            },
            {
              value: "In reparatie",
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
    formIsValid: false,
    loading: false
  };

  componentDidMount() {
    if (this.props.match.params.id === "edit-tank") {
      axios
        .get("/tanks/-LUzgXHn-CxVu48M9BrX.json")
        .then(tanks => {
          this.setState({ loading: false, tanks: tanks.data });
          console.log(tanks);
        })
        .catch(error => {
          this.setState({ loading: false });
        });
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
      tankData: formData
    };
    axios
      .post("/tanks.json", tank) //endpoint
      .then(response => {
        console.log(response);
        this.setState({ loading: false });
        this.props.history.push("/tanks");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  cancelAddTankHandler = () => {
    this.props.history.push("/tanks");
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedTankForm = {
      ...this.state.tankForm
    };
    const updatedTankFormElement = {
      ...updatedTankForm[inputIdentifier]
    };
    updatedTankFormElement.value = event.target.value;
    updatedTankFormElement.touched = true;
    updatedTankFormElement.valid = checkValidation(
      updatedTankFormElement.value,
      updatedTankFormElement.validation
    );
    updatedTankForm[inputIdentifier] = updatedTankFormElement;
    console.log(updatedTankFormElement);

    let formIsValid = true;
    for (let inputIdentifier in updatedTankForm) {
      formIsValid = updatedTankForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ tankForm: updatedTankForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    const title = (
      <h3>
        {this.props.match.params.id === "add-tank"
          ? "Toevoegen tank"
          : "Wijzigen tank"}
      </h3>
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
            Save
          </Button>
          <Button clicked={this.cancelAddTankHandler}>Cancel</Button>
        </section>
      </Form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div >
        {form}
      </div>
    );
  }
}

export default withRouter(withErrorHandler(AddTank, axios));

