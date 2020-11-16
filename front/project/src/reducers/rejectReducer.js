import {
  REJECT_REQUEST_SUCCESS,
  REJECT_REQUEST_FAIL,
  LOGOUT,
} from "../actions/types";
const initState = {
  errors: null,
  rejected_req: null,
};

const RejectReducer = (state = initState, action) => {
  switch (action.type) {
    case REJECT_REQUEST_SUCCESS:
      return { ...state, rejected_req: action.payload, errors: null };
    case REJECT_REQUEST_FAIL:
      return { ...state, rejected_req: null, errors: action.payload };
    case LOGOUT:
      return { ...state, rejected_req: null, errors: null };
    default:
      return state;
  }
};
export default RejectReducer;
