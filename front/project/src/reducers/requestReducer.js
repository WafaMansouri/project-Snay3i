import {
  SEND_REQUEST_SUCCESS,
  SEND_REQUEST_FAIL,
  CHECK_REQUEST_SUCCESS,
  CHECK_REQUEST_FAIL,
} from "../actions/types";
const initState = {
  errors: null,
  requests: null,
};

const RequestReducer = (state = initState, action) => {
  switch (action.type) {
    // case SEND_REQUEST_SUCCESS:
    case CHECK_REQUEST_SUCCESS:
      return { ...state, requests: action.payload, errors: null };
    // case SEND_REQUEST_FAIL:
    case CHECK_REQUEST_FAIL:
      return { ...state, requests: {}, errors: action.payload };
    default:
      return state;
  }
};
export default RequestReducer;
