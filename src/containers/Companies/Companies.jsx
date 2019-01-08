import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Companies.css";
import Button from "../../components/Common/Button/Button";
import axios from "../../axios-users";
import Company from "./Company/Company";
import Spinner from "../../components/Common/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import Search from "../../components/Common/Search/Search";

class Companies extends Component {
  // state = {
  //   addingCompanies: false
  // };

  componentDidMount() {
    this.props.onFetchCompanies();
  }

  addingCompanyHandler = () => {
    this.props.history.push({pathname: this.props.match.url + "/add-company"});
  };

  // editCompanyHandler = (id) => {
  //   this.props.history.push({pathname: this.props.match.url + "/edit-company/" + id});
  // };

  // cancelAddCompanyHandler = () => {
  //   this.props.history.goBack();
  // };

  editCompanyHandler = (id) => {
    axios
      .get("companies/" + id + ".json")
      .then(response => {
        console.log(response);
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  removeCompanyHandler = (id) => {
    this.props.onDeleteCompanies(id);
    console.log(id);
  //   axios
  //     .delete("companies/" + id + ".json")
  //     .then(response => {
  //       console.log(response);
  //       this.setState({ loading: false });
  //     })
  //     .catch(error => {
  //       this.setState({ loading: false });
  //     });
  };

  render() {
    let companies = <Spinner />;
    if (!this.props.loading) {
      companies = this.props.companies.map(company => {
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    companies: state.companies.companies,
    loading: state.companies.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCompanies: () => dispatch(actions.fetchCompanies()),
    onDeleteCompanies: (id) => dispatch(actions.deleteCompany(id))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Companies, axios));
