import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/update";

const initialState = {
  companies: [],
  loading: false,
  error: false
};

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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_COMPANIES_START: return fetchCompaniesStart(state, action);
    case actionTypes.FETCH_COMPANIES_SUCCES: return fetchCompaniesSucces(state, action);
    case actionTypes.FETCH_COMPANIES_FAIL: return fetchCompaniesFail(state, action);
    default: return state;
  }
};

export default reducer;
