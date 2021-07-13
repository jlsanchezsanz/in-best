import { CHANGE_FILTERS } from '../actions/types';

const initialState = {
  BVPS: 5,
  EPS: 5,
  FCF: 5,
  revenue: 5,
  ROI: 5,
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
