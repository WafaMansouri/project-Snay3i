import { SEARCH_SUCCESS, SEARCH_FAIL, RETURN_SEARCH } from "../actions/types";
const initState = {
  errors: null,
  artisans: [],
  test: false,
};

const SearchReducer = (state = initState, action) => {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return { ...state, artisans: action.payload, errors: null, test: true };
    case SEARCH_FAIL:
      return { ...state, artisans: [], errors: action.payload };
    case RETURN_SEARCH:
      return { ...state, test: false };
    default:
      return state;
  }
};
export default SearchReducer;
