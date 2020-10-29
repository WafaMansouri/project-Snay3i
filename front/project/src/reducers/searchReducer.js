import { SEARCH_SUCCESS, SEARCH_FAIL, RETURN_SEARCH } from "../actions/types";
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
    case RETURN_SEARCH:
      return { ...state };
    default:
      return state;
  }
};
export default SearchReducer;
