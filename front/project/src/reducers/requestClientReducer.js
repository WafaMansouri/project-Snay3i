import {
  CHECK_REQUESTS_CLIENT_SUCCESS,
  CHECK_REQUESTS_CLIENT_FAIL,
  LOGOUT,
} from "../actions/types";
const initState = {
  errors: null,
  requests: null,
};

const RequestClientReducer = (state = initState, action) => {
  switch (action.type) {
    case CHECK_REQUESTS_CLIENT_SUCCESS:
      return { ...state, requests: action.payload, errors: null };

    case CHECK_REQUESTS_CLIENT_FAIL:
      return { ...state, requests: null, errors: action.payload };
    case LOGOUT:
      return { ...state, errors: null, requests: null };
    default:
      return state;
  }
};
export default RequestClientReducer;
