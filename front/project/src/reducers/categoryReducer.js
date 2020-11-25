import {
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAIL,
  ALL_CATEGORIES_SUCCESS,
  ALL_CATEGORIES_FAIL,
} from "../actions/types";
const initState = {
  newCategory: {},
  errors: null,
  categories: [],
};

const CategoryReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_CATEGORY_SUCCESS:
      return { ...state, newCategory: action.payload, errors: null };
    case ADD_CATEGORY_FAIL:
      return { ...state, newCategory: {}, errors: action.payload };
    case ALL_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload };
    case ALL_CATEGORIES_FAIL:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
export default CategoryReducer;
