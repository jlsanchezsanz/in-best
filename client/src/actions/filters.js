import { CHANGE_FILTERS } from './types';

export const changeFilters = (filters) => async (dispatch) => {
  dispatch({
    type: CHANGE_FILTERS,
    payload: filters,
  });
};
