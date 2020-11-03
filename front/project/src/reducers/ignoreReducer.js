import {
  IGNORE_REQUEST_SUCCESS,
  IGNORE_REQUEST_FAIL,
  LOGOUT,
} from "../actions/types";
const initState = {
  errors: null,
  ignored_req: null,
};

const IgnoreReducer = (state = initState, action) => {
  switch (action.type) {
    case IGNORE_REQUEST_SUCCESS:
      return { ...state, ignored_req: action.payload, errors: null };
    case IGNORE_REQUEST_FAIL:
      return { ...state, ignored_req: null, errors: action.payload };
    case LOGOUT:
      return { ...state, ignored_req: null, errors: null };
    default:
      return state;
  }
};
export default IgnoreReducer;
