import {
  VISIT_PROFILE_SUCCESS,
  VISIT_PROFILE_FAIL,
  LOGOUT,
} from "../actions/types";
const initState = {
  errors: null,
  artisan: null,
};

const VisitReducer = (state = initState, action) => {
  switch (action.type) {
    case VISIT_PROFILE_SUCCESS:
      return { ...state, artisan: action.payload, errors: null, test: true };
    case VISIT_PROFILE_FAIL:
      return { ...state, artisan: null, errors: action.payload };
    case LOGOUT:
      return { ...state, errors: null, artisan: null };
    default:
      return state;
  }
};
export default VisitReducer;
