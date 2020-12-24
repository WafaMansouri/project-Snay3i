import { GET_USERS_SUCCESS, GET_USERS_FAIL, LOGOUT } from "../actions/types";
const initState = {
  users: null,
  errors: null,
};

const ListUsersReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return { ...state, users: action.payload, errors: null };
    case GET_USERS_FAIL:
      return { ...state, errors: action.payload, users: null };
    case LOGOUT:
      return { ...state, users: null, errors: null };
    default:
      return state;
  }
};
export default ListUsersReducer;
