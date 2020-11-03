import {
  GET_RATES_ARTISAN_SUCCESS,
  GET_RATES_ARTISAN_FAIL,
  LOGOUT,
} from "../actions/types";
const initState = {
  errors: null,
  rate: null,
};

const RateArtisanReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_RATES_ARTISAN_SUCCESS:
      return { ...state, rate: action.payload, errors: null };
    case GET_RATES_ARTISAN_FAIL:
      return { ...state, rate: null, errors: action.payload };
    case LOGOUT:
      return { ...state, errors: null, rate: null };
    default:
      return state;
  }
};
export default RateArtisanReducer;
