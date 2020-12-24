import {
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAIL,
  ALL_CATEGORIES_SUCCESS,
  ALL_CATEGORIES_FAIL,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  LOGOUT,
} from "../actions/types";
const initState = {
  newCategory: null,
  errors: null,
  categories: {},
  deletedCategory: null,
};

const CategoryReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        newCategory: action.payload,
        deletedCategory: null,
        errors: null,
      };
    case ADD_CATEGORY_FAIL:
      return { ...state, newCategory: null, errors: action.payload };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        deletedCategory: action.payload,
        newCategory: null,
        errors: null,
      };
    case DELETE_CATEGORY_FAIL:
      return { ...state, deletedCategory: null, errors: action.payload };
    case ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        newCategory: null,
        deletedCategory: null,
        categories: action.payload,
        errors: null,
      };
    case ALL_CATEGORIES_FAIL:
      return { ...state, errors: action.payload };
    case LOGOUT:
      return {
        ...state,
        newCategory: null,
        deletedCategory: null,
        errors: null,
      };
    default:
      return state;
  }
};
export default CategoryReducer;
