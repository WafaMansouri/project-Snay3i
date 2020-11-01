import { ADD_POST_SUCCESS, ADD_POST_FAIL, LOGOUT } from "../actions/types";
const initState = {
  errors: null,
};

const addPostReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_POST_SUCCESS:
      return { ...state, ...action.payload, errors: null };
    case ADD_POST_FAIL:
      return { errors: action.payload };
    case LOGOUT:
      return { ...state, errors: null };
    default:
      return state;
  }
};
export default addPostReducer;
