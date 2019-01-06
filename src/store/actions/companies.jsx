import * as actionTypes from "./actionTypes";
import axios from "../../axios-users";

export const fetchCompaniesStart = () => {
    return {
      type: actionTypes.FETCH_COMPANIES_START
    };
  };

export const fetchCompaniesSucces = companies => {
  return {
    type: actionTypes.FETCH_COMPANIES_SUCCES,
    companies: companies
  };
};

export const fetchCompaniesFail = error => {
  return {
    type: actionTypes.FETCH_COMPANIES_FAIL,
    error: error
  };
};

export const fetchCompanies = () => {
  return dispatch => {
    dispatch(fetchCompaniesStart());
    axios
      .get("/companies.json")
      .then(companies => {
        const fetchedCompanies = [];
        for (let key in companies.data) {
          fetchedCompanies.push({
            ...companies.data[key],
            id: key
          });
        }
        dispatch(fetchCompaniesSucces(fetchedCompanies));
      })
      .catch(error => {
        dispatch(fetchCompaniesFail(error));
      });
  };
};


