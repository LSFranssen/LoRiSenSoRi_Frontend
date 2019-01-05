import React, { Component } from "react";
// import { Route } from "react-router-dom";

import classes from "./Companies.css";
import Button from "../../components/Common/Button/Button";
import axios from "../../axios-users";
import Company from "./Company/Company";
// import AddCompany from "./Company/AddCompany/AddCompany";
import Spinner from "../../components/Common/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Search from "../../components/Common/Search/Search";

class Companies extends Component {
  state = {
    companies: [],
    loading: true,
    error: false,
    addingCompanies: false
  };

  componentDidMount() {
    axios
      .get("/companies.json")
      .then(companies => {
        const fetchedCompanies = [];
        for (let key in companies.data) {
          fetchedCompanies.push({
            ...companies.data[key],
            id: key
          });
          console.log(fetchedCompanies);
        }
        this.setState({ loading: false, companies: fetchedCompanies });
        console.log(companies.data);
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }

  addingCompanyHandler = () => {
    this.props.history.push({pathname: this.props.match.url + "/add-company"});
  };

  editCompanyHandler = (id) => {
    this.props.history.push({pathname: this.props.match.url + "/edit-company/" + id});
  };

  // cancelAddCompanyHandler = () => {
  //   this.props.history.goBack();
  // };

  removeCompanyHandler = (id) => {
    axios
      .delete("companies/" + id)
      .then(response => {
        console.log(response);
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  render() {
    let companies = <Spinner />;
    if (!this.state.loading) {
      companies = this.state.companies.map(company => {
        return (
          <Company
            key={company.id}
            id={company.id}
            bedrijfsnaam={company.companyData.bedrijfsnaam}
            straatnaam={company.companyData.straatnaam}
            huisnummer={company.companyData.huisnummer}
            huisnummerToevoeging={company.companyData.huisnummertoevoeging}
            postcode={company.companyData.postcode}
            plaats={company.companyData.plaatsnaam}
            editCompany={() => this.editCompanyHandler (company.id)}
            removeCompany={() => this.removeCompanyHandler (company.id)}
          />
        );
      });
    }

    return (
      <div className={classes.Companies}>
        <h3>Bedrijven</h3>
        <div className={classes.Div}>
          <Button clicked={this.addingCompanyHandler} name="Toevoegen">
            Toevoegen
          </Button>
          <Search />
        </div>
        {companies}
        {/* <Route
          path={this.props.history.push + "/addCompany"}
          render={() => <AddCompany />}
        /> */}
      </div>
    );
  }
}

export default withErrorHandler(Companies, axios);
