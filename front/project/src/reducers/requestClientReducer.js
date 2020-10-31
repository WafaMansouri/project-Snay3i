import {
  SEND_REQUEST_SUCCESS,
  SEND_REQUEST_FAIL,
  CHECK_REQUEST_CLIENT_SUCCESS,
  CHECK_REQUEST_CLIENT_FAIL,
} from "../actions/types";
const initState = {
  errors: null,
  requests: null,
};

const RequestClientReducer = (state = initState, action) => {
  switch (action.type) {
    // case SEND_REQUEST_SUCCESS:
    case CHECK_REQUEST_CLIENT_SUCCESS:
      return { ...state, requests: action.payload, errors: null };
    // case SEND_REQUEST_FAIL:
    case CHECK_REQUEST_CLIENT_FAIL:
      return { ...state, requests: null, errors: action.payload };
    default:
      return state;
  }
};
export default RequestClientReducer;
