import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_SUCCESS,
  LOAD_FAIL,
  LOGOUT,
} from "./types";
import axios from "axios";
import setToken from "../setToken";
// This action wil dispatched when we submit a register form
export const register = (info) => (dispatch) => {
  //info state in register component
  axios
    .post("/register", info) //bind front and back
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data, //an object contain the key token returrned
      })
    )
    .catch((err) =>
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
// This action wil dispatched after register and have been redirected to feed page to retrieve user data
export const loadClient = () => (dispatch) => {
  setToken(); //to set the token in the header
  axios
    .get("/login") //bind front and back
    .then((res) =>
      dispatch({
        type: LOAD_SUCCESS,
        payload: res.data, // the client's data
      })
    )
    .catch((err) =>
      dispatch({
        type: LOAD_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
export const login = (info) => (dispatch) => {
  axios
    .post("/login", info) //bind front and back
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data, // the user's data
      })
    )
    .catch((err) =>
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
export const logOut = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
