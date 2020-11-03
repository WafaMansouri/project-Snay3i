import {
  ACCEPT_REQUEST_SUCCESS,
  ACCEPT_REQUEST_FAIL,
  LOGOUT,
} from "../actions/types";
const initState = {
  errors: null,
  accepted_req: null,
};

const AcceptReducer = (state = initState, action) => {
  switch (action.type) {
    case ACCEPT_REQUEST_SUCCESS:
      return { ...state, accepted_req: action.payload, errors: null };
    case ACCEPT_REQUEST_FAIL:
      return { ...state, accepted_req: null, errors: action.payload };
    case LOGOUT:
      return { ...state, accepted_req: null, errors: null };
    default:
      return state;
  }
};
export default AcceptReducer;
