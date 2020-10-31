import {
  ADD_POST_SUCCESS,
  ADD_POST_FAIL,
  CHECK_REQUESTS_ARTISAN_SUCCESS,
  CHECK_REQUESTS_ARTISAN_FAIL,
  RESPONSE_ARTISAN_SUCCESS,
  RESPONSE_ARTISAN_FAIL,
} from "./types";
import axios from "axios";
import setToken from "../setToken";
// To make a post
export const addPostAction = (info) => (dispatch) => {
  setToken(); //to set the token in the header
  axios
    .post("/post", info) //bind front and back
    .then((res) =>
      dispatch({
        type: ADD_POST_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: ADD_POST_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
// To get the information of requests if exist at the load App.js
export const checkRequest_artisan = () => (dispatch) => {
  setToken();
  axios
    .get("artisan/requests/") //bind front and back
    .then((res) =>
      dispatch({
        type: CHECK_REQUESTS_ARTISAN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: CHECK_REQUESTS_ARTISAN_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
// To make a post
export const respondAction = (response) => (dispatch) => {
  setToken(); //to set the token in the header
  axios
    .post("/artisan/response", response) //bind front and back
    .then((res) =>
      dispatch({
        type: RESPONSE_ARTISAN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: RESPONSE_ARTISAN_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
