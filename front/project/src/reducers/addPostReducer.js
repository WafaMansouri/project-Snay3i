import { ADD_POST_SUCCESS, ADD_POST_FAIL } from "../actions/types";
const initState = {
  errors: null,
};

const addPostReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_POST_SUCCESS:
      return { ...state, ...action.payload, errors: null };
    case ADD_POST_FAIL:
      return { errors: action.payload };
    // case ALL_CATEGORIES_SUCCESS:
    //   return { ...state, categories: action.payload };
    // case ALL_CATEGORIES_FAIL:
    //   return { ...state, errors: action.payload };
    default:
      return state;
  }
};
export default addPostReducer;
