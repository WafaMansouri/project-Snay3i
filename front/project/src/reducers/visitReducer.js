import { VISIT_PROFILE_SUCCESS, VISIT_PROFILE_FAIL } from "../actions/types";
const initState = {
  errors: null,
  artisan: {},
  // testVisit: false,
};

const VisitReducer = (state = initState, action) => {
  switch (action.type) {
    case VISIT_PROFILE_SUCCESS:
      return { ...state, artisan: action.payload, errors: null, test: true };
    case VISIT_PROFILE_FAIL:
      return { ...state, artisan: {}, errors: action.payload };
    default:
      return state;
  }
};
export default VisitReducer;
