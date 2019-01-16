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
      .get("http://localhost:9004/bedrijf/")
      .then(companies => {
        const fetchedCompanies = [];
        for (let key in companies.data) {
          fetchedCompanies.push({
            ...companies.data[key],
            // companyId: key
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

const deleteCompanyByIdSucces = (companies, companyId) => {
  return {
    type: actionTypes.DELETE_COMPANY_BY_ID_SUCCESS,
    companies: companies,
    companyId: companyId
  };
};

const deleteCompanyByIdFail = error => {
  return {
    type: actionTypes.DELETE_COMPANY_BY_ID_FAIL,
    error: error
  };
};

export const deleteCompany = companyId => {
  return dispatch => {
    dispatch(deleteCompanyByIdStart());
    axios
      .delete("http://localhost:9004/bedrijf/" + companyId)
      .then(response => {
        dispatch(deleteCompanyByIdSucces(response));
        dispatch(fetchCompanies());
        console.log(response.data);
      })
      .catch(error => {
        dispatch(deleteCompanyByIdFail(error));
      });
  };
};