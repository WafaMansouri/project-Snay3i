import {
  SEND_REQUEST_SUCCESS,
  SEND_REQUEST_FAIL,
  LOGOUT,
} from "../actions/types";
const initState = {
  errors: null,
  request: null,
};

const SendRequestReducer = (state = initState, action) => {
  switch (action.type) {
    case SEND_REQUEST_SUCCESS:
      return { ...state, request: action.payload, errors: null };
    case SEND_REQUEST_FAIL:
      return { ...state, request: null, errors: action.payload };
    case LOGOUT:
      return { ...state, request: null, errors: null };
    default:
      return state;
  }
};
export default SendRequestReducer;
