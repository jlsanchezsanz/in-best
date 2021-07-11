import axios from 'axios';

import { CHANGE_PAGE, GET_COMPANIES, GET_COMPANIES_ERROR } from './types';

export const getCompanies = (page, limit, BVPS, EPS, FCF, revenue, ROI) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/companies/${page}/${limit}/${BVPS}/${EPS}/${FCF}/${revenue}/${ROI}`
    );

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

export const changePage = (page) => async (dispatch) => {
  dispatch({
    type: CHANGE_PAGE,
    payload: page,
  });
};
