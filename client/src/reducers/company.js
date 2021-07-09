import { GET_COMPANIES, GET_COMPANIES_ERROR } from '../actions/types';

const initialState = {
  companies: [],
  count: 0,
  currentPage: 1,
  pages: 0,
  loading: true,
  error: {},
};

const companyReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_COMPANIES:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case GET_COMPANIES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return { ...state };
  }
};

export default companyReducer;
