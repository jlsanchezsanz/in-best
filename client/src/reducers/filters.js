import { CHANGE_FILTERS } from '../actions/types';

const initialState = {
  BVPS: 10,
  EPS: 10,
  FCF: 10,
  revenue: 10,
  ROI: 10,
};

const filtersReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_FILTERS:
      return {
        ...state,
        ...payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default filtersReducer;
