import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_SUCCESS,
  LOAD_FAIL,
  LOGOUT,
} from "../actions/types";
const initState = {
  token: localStorage.getItem("token"),
  user: null,
  isAuth: false,
  errors: null,
};

const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_SUCCESS:
      return { ...state, user: action.payload, errors: null };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuth: true,
        errors: null,
      };
    case LOGIN_FAIL:
    case LOAD_FAIL:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return { ...state, isAuth: false, errors: action.payload };
    case LOGOUT:
      localStorage.removeItem("token");
      return { ...state, isAuth: false, errors: null, user: null, token: null };
    default:
      return state;
  }
};
export default AuthReducer;
