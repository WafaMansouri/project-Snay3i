import { SEARCH_SUCCESS, SEARCH_FAIL, LOGOUT } from "../actions/types";
const initState = {
  errors: null,
  artisans: [],
};

const SearchReducer = (state = initState, action) => {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return { ...state, artisans: action.payload, errors: null };
    case SEARCH_FAIL:
      return { ...state, artisans: [], errors: action.payload };
    case LOGOUT:
      return { ...state, errors: null, artisans: [] };
    default:
      return state;
  }
};
export default SearchReducer;
