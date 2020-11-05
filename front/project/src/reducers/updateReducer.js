import {
  UPDATE_INFO_SUCCESS,
  UPDATE_INFO_FAIL,
  LOGOUT,
} from "../actions/types";
const initState = {
  errors: null,
  updated: null,
};

const UpdateReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_INFO_SUCCESS:
      return { ...state, updated: action.payload, errors: null };
    case UPDATE_INFO_FAIL:
      return { ...state, updated: null, errors: action.payload };
    case LOGOUT:
      return { ...state, errors: null, rate: null };
    default:
      return state;
  }
};
export default UpdateReducer;
