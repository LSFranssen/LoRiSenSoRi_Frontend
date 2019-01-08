import * as actionTypes from "./actionTypes";
import axios from "../../axios-users";

// fetch all companies
export const fetchCompaniesStart = () => {
  return {
    type: actionTypes.FETCH_COMPANIES_START
  };
};

export const fetchCompaniesSucces = companies => {
  return {
    type: actionTypes.FETCH_COMPANIES_SUCCESS,
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

// Remove company
const deleteCompanyByIdStart = () => {
  return {
    type: actionTypes.DELETE_COMPANY_BY_ID_START
  };
};

const deleteCompanyByIdSucces = (companies, id) => {
  return {
    type: actionTypes.DELETE_COMPANY_BY_ID_SUCCESS,
    companies: companies,
    id: id
  };
};

const deleteCompanyByIdFail = error => {
  return {
    type: actionTypes.DELETE_COMPANY_BY_ID_FAIL,
    error: error
  };
};

export const deleteCompany = id => {
  return dispatch => {
    dispatch(deleteCompanyByIdStart());
    axios
      .delete("/companies/" + id + ".json")
      .then(response => {
        dispatch(deleteCompanyByIdSucces(response));
        dispatch(fetchCompanies());
        console.log(response);
      })
      .catch(error => {
        dispatch(deleteCompanyByIdFail(error));
      });
  };
};
