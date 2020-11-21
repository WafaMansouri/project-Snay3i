import {
  ADD_POST_SUCCESS,
  ADD_POST_FAIL,
  CHECK_REQUESTS_ARTISAN_SUCCESS,
  CHECK_REQUESTS_ARTISAN_FAIL,
  RESPONSE_ARTISAN_SUCCESS,
  RESPONSE_ARTISAN_FAIL,
  ACCEPT_REQUEST_SUCCESS,
  ACCEPT_REQUEST_FAIL,
  GET_POSTS_ARTISAN_SUCCESS,
  GET_POSTS_ARTISAN_FAIL,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  GET_LIKES_ARTISAN_SUCCESS,
  GET_LIKES_ARTISAN_FAIL,
} from "./types";
import axios from "axios";
import setToken from "../setToken";
import { loadClient } from "./authActions";
// To make a post
export const addPostAction = (info, file, config) => (dispatch) => {
  setToken(); //to set the token in the header
  let formData = new FormData();
  formData.append("avatar", file);
  formData.append("info", JSON.stringify(info));
  axios
    .post("/post", formData, config) //bind front and back
    .then((res) => {
      dispatch({
        type: ADD_POST_SUCCESS,
        payload: res.data,
      });
      dispatch(loadClient());
    })
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
    .catch((err) => {
      console.log(err);
      dispatch({
        type: CHECK_REQUESTS_ARTISAN_FAIL,
        payload: err.response.data.errors[0].msg,
      });
    });
};
// To respond to request
export const respondAction = (response) => (dispatch) => {
  setToken(); //to set the token in the header
  axios
    .post("/artisan/response", response) //bind front and back
    .then((res) => {
      dispatch({
        type: RESPONSE_ARTISAN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: RESPONSE_ARTISAN_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
// Accept the Request
export const accept_artisanAction = (id_request) => (dispatch) => {
  setToken();
  axios
    .post("/artisan/accept", { id_request }) //bind front and back
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

// To get ALL the posts of the connected artisan
export const artisanPostsAction = (id) => (dispatch) => {
  // setToken();
  axios
    .get(`/artisan/posts/${id}`) //bind front and back
    .then((res) =>
      dispatch({
        type: GET_POSTS_ARTISAN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POSTS_ARTISAN_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
// To delete a post
export const deletePostAction = (id_post) => (dispatch) => {
  setToken(); //to set the token in the header
  axios
    .delete(`/artisan/deletePost/${id_post}`) //bind front and back
    .then((res) => {
      dispatch({
        type: DELETE_POST_SUCCESS,
        // payload: res.data,
      });
      dispatch(artisanPostsAction(res.data.id_owner));
    })
    .catch((err) =>
      dispatch({
        type: DELETE_POST_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
// To get ALL the likes of the connected artisan
export const likesArtisanAction = (id) => (dispatch) => {
  axios
    .get(`/artisan/likes/${id}`) //bind front and back
    .then((res) =>
      dispatch({
        type: GET_LIKES_ARTISAN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_LIKES_ARTISAN_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
