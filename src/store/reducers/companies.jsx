import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/update";

const initialState = {
  companies: [],
  loading: false,
};

// fetch all companies
const fetchCompaniesStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchCompaniesSucces = (state, action) => {
  return updateObject(state, {
    companies: action.companies,
    loading: false
  });
};

const fetchCompaniesFail = (state, action) => {
  return updateObject(state, { loading: false });
};

// delete company
const deleteCompanyByIdStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const deleteCompanyByIdSucces = (state, action) => {
  const updatedCompanies = state.companies.filter(company => company.id !== action.id);
  return updateObject(state, {
    loading: false,
    companies: updatedCompanies
  });
};

const deleteCompanyByIdFail = state => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_COMPANIES_START:
      return fetchCompaniesStart(state, action);
    case actionTypes.FETCH_COMPANIES_SUCCESS:
      return fetchCompaniesSucces(state, action);
    case actionTypes.FETCH_COMPANIES_FAIL:
      return fetchCompaniesFail(state, action);
    case actionTypes.DELETE_COMPANY_BY_ID_START:
      return deleteCompanyByIdStart(state, action);
    case actionTypes.DELETE_USER_BY_ID_SUCCESS:
      return deleteCompanyByIdSucces(state, action);
    case actionTypes.DELETE_USER_BY_ID_FAIL:
      return deleteCompanyByIdFail(state, action);
    default:
      return state;
  }
};

export default reducer;
