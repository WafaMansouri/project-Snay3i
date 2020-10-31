import {
  CHECK_REQUESTS_ARTISAN_SUCCESS,
  CHECK_REQUESTS_ARTISAN_FAIL,
} from "../actions/types";
const initState = {
  errors: null,
  requests: null,
};

const RequestArtisanReducer = (state = initState, action) => {
  switch (action.type) {
    case CHECK_REQUESTS_ARTISAN_SUCCESS:
      return { ...state, requests: action.payload, errors: null };

    case CHECK_REQUESTS_ARTISAN_FAIL:
      return { ...state, requests: null, errors: action.payload };
    default:
      return state;
  }
};
export default RequestArtisanReducer;
