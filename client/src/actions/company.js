import axios from 'axios';

import { GET_COMPANIES, GET_COMPANIES_ERROR } from './types';

export const getCompanies = (page, limit) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/companies/${page}/${limit}`);

    dispatch({
      type: GET_COMPANIES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_COMPANIES_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
