import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import classes from "./AddCompany.css";
import Button from "../../../../components/Common/Button/Button";
import Input from "../../../../components/Common/Input/Input";
import Spinner from "../../../../components/Common/Spinner/Spinner";
import axios from "../../../../axios-users";
import withErrorHandler from "../../../../hoc/withErrorHandler/withErrorHandler";
import { checkValidation } from "../../../../shared/validation";
import Form from "../../../../components/Form/Form";

class AddCompany extends Component {
  state = {
    companyForm: {
      bedrijfsnaam: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Bedrijfsnaam"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      straatnaam: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Straatnaam"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      huisnummer: {
        elementType: "number",
        elementConfig: {
          type: "text",
          placeholder: "Huisnummer"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      huisnummertoevoeging: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Huisnummertoevoeging"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      postcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postcode"
        },
        value: "",
        validation: {
          required: true,
          zipcode: true
        },
        valid: false,
        touched: false,
        errorMessage: "Voer een geldige postcode in"
      },

      plaatsnaam: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Plaatsnaam"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      landen: {
        label: "Selecteer het land",
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "Nederland",
              displayValue: "Nederland"
            },
            {
              value: "België",
              displayValue: "België"
            },
            {
              value: "Luxemburg",
              displayValue: "Luxemburg"
            }
          ]
        },
        value: "Nederland",
        validation: {},
        valid: true
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
        errorMessage: "Please enter a valid phone number"
      },

      rekeningnummer: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Rekeningnummer"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      btwNummer: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "BTW nummer"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      kvkNummer: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "KVK nummer"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
      },
    formIsValid: false,
    loading: false
  
  };

  componentDidMount() {
    if (this.props.match.params.id === "edit-company") {
      axios
        .get("/companies/-LV3m8D5JfVVkKoKrtv6.json")
        .then(companies => {
          this.setState({ loading: false, companies: companies.data });
          console.log(companies);
        })
        .catch(error => {
          this.setState({ loading: false });
        });
    }
  }

  saveAddCompanyHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.companyForm) {
      formData[formElementIdentifier] = this.state.companyForm[
        formElementIdentifier
      ].value;
    }
    const company = {
      companyData: formData
    };
    axios
      .post("/companies.json", company) /*endpoint!*/
      .then(response => {
        console.log(response);
        this.setState({ loading: false });
        this.props.history.push("/companies");
      })

      .catch(error => {
        this.setState({ loading: false });
      });
  };

  cancelAddCompanyHandler = () => {
    this.props.history.push("/companies");
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedCompanyForm = {
      ...this.state.companyForm
    };
    const updatedCompanyFormElement = {
      ...updatedCompanyForm[inputIdentifier]
    };
    updatedCompanyFormElement.value = event.target.value;
    updatedCompanyFormElement.touched = true;
    updatedCompanyFormElement.valid = checkValidation(
      updatedCompanyFormElement.value,
      updatedCompanyFormElement.validation
    );

    updatedCompanyForm[inputIdentifier] = updatedCompanyFormElement;
    console.log(updatedCompanyFormElement);

    let formIsValid = true;
    for (let inputIdentifier in updatedCompanyForm) {
      formIsValid = updatedCompanyForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ companyForm: updatedCompanyForm, formIsValid: formIsValid });
  };

  render() {
    const title = (
      <h3>
        {this.props.match.params.id === "add-company"
          ? "Toevoegen bedrijf"
          : "Wijzigen bedrijf"}
      </h3>
    );

    const formElementsArray = [];
    for (let key in this.state.companyForm) {
      formElementsArray.push({
        id: key,
        setup: this.state.companyForm[key]
      });
    }
    let form = (
      <Form onSubmit={this.saveAddCompanyHandler}>
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
            clicked={this.saveAddCompanyHandler}
            disabled={!this.state.formIsValid}
          >
            Opslaan
          </Button>
          <Button clicked={this.cancelAddCompanyHandler}>Annuleer</Button>
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

export default withRouter(withErrorHandler(AddCompany, axios));

