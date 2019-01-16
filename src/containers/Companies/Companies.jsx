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
  
  componentDidMount() {
    this.props.onFetchCompanies();
  }

  addingCompanyHandler = () => {
    this.props.history.push({pathname: this.props.match.url + "/add-company"});
  };

  editCompanyHandler = (companyId) => {
    this.props.history.push({pathname: this.props.match.url + "/edit-company/" + companyId});
  };

  removeCompanyHandler = (companyId) => {
    this.props.onDeleteCompanies(companyId);
    console.log("Removed: ");
    console.log(companyId);
  };

  render() {
    let companies = <Spinner />;
    if (!this.props.loading) {
      companies = this.props.companies.map(company => {
        return (
          <Company
            key={company.companyId}
            companyId={company.companyId}
            bedrijfsnaam={company.companyData.bedrijfsnaam}
            straatnaam={company.companyData.straatnaam}
            huisnummer={company.companyData.huisnummer}
            huisnummerToevoeging={company.companyData.huisnummertoevoeging}
            postcode={company.companyData.postcode}
            plaats={company.companyData.plaatsnaam}
            editCompany={() => this.editCompanyHandler (company.companyId)}
            removeCompany={() => this.removeCompanyHandler (company.companyId)}
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
    loading: state.companies.loading,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCompanies: () => dispatch(actions.fetchCompanies()),
    onDeleteCompanies: (companyId) => dispatch(actions.deleteCompany(companyId))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Companies, axios));
