import {
  GET_RATING_CLIENT_SUCCESS,
  GET_RATING_CLIENT_FAIL,
  LOGOUT,
} from "../actions/types";
const initState = {
  errors: null,
  rate: null,
};

const RateClientReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_RATING_CLIENT_SUCCESS:
      return { ...state, rate: action.payload, errors: null };
    case GET_RATING_CLIENT_FAIL:
      return { ...state, rate: null, errors: action.payload };
    case LOGOUT:
      return { ...state, errors: null, rate: null };
    default:
      return state;
  }
};
export default RateClientReducer;
