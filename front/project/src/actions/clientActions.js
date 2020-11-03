import {
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  VISIT_PROFILE_SUCCESS,
  VISIT_PROFILE_FAIL,
  SEND_REQUEST_SUCCESS,
  SEND_REQUEST_FAIL,
  CHECK_REQUESTS_CLIENT_SUCCESS,
  CHECK_REQUESTS_CLIENT_FAIL,
  ACCEPT_REQUEST_SUCCESS,
  ACCEPT_REQUEST_FAIL,
  RATING_SUCCESS,
  RATING_FAIL,
  GET_RATING_CLIENT_SUCCESS,
  GET_RATING_CLIENT_FAIL,
} from "./types";
import axios from "axios";
import setToken from "../setToken";

export const searchByNameAction = (name) => (dispatch) => {
  //   setToken(); //to set the token in the header
  axios
    .get(`/search/${name}`) //bind front and back
    .then((res) =>
      dispatch({
        type: SEARCH_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: SEARCH_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
//to visit the artisan appear in the Search section
export const visitByIdAction = (id) => (dispatch) => {
  setToken();
  axios
    .get(`/visit/artisan/${id}`) //bind front and back
    .then((res) =>
      dispatch({
        type: VISIT_PROFILE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: VISIT_PROFILE_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
// Send request
export const sendRequestAction = (requestInfo) => (dispatch) => {
  setToken();
  axios
    .post("/visit/request", requestInfo) //bind front and back
    .then((res) =>
      dispatch({
        type: SEND_REQUEST_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: SEND_REQUEST_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
// To get the information of a request if exists and if he visit the artisan
export const checkRequest_client = () => (dispatch) => {
  setToken();
  axios
    .get(`/client/requests`) //bind front and back
    .then((res) =>
      dispatch({
        type: CHECK_REQUESTS_CLIENT_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: CHECK_REQUESTS_CLIENT_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
// Confirm the Request
export const confirm_clientAction = (id_request) => (dispatch) => {
  setToken();
  axios
    .post("/client/confirm", { id_request }) //bind front and back
    .then((res) =>
      dispatch({
        type: ACCEPT_REQUEST_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: ACCEPT_REQUEST_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
// Rating Artisna
export const ratingAction = (rateInfo) => (dispatch) => {
  setToken();
  axios
    .post("/client/rating", rateInfo) //bind front and back
    .then((res) =>
      dispatch({
        type: RATING_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: RATING_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
// To get the rate of the client to the visited artisan
export const getRateAction = (id) => (dispatch) => {
  setToken();
  axios
    .get(`/client/rating/${id}`) //bind front and back
    .then((res) =>
      dispatch({
        type: GET_RATING_CLIENT_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_RATING_CLIENT_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
