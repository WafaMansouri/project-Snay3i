import {
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAIL,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_FAIL,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAIL,
} from "./types";
import axios from "axios";
import setToken from "../setToken";
import { retrieveCategories } from "../actions/categoriesActions";

//Add new category
export const addCategory = (newCategory) => (dispatch) => {
  setToken(); //to set the token in the header
  axios
    .post("/admin/category", newCategory) //bind front and back
    .then((res) => {
      dispatch({
        type: ADD_CATEGORY_SUCCESS,
        payload: res.data,
      });
      dispatch(retrieveCategories());
    })
    .catch((err) =>
      dispatch({
        type: ADD_CATEGORY_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
//Delete category
export const deleteCategory = (name) => (dispatch) => {
  setToken(); //to set the token in the header
  axios
    .delete(`/admin/delete_category/${name}`) //bind front and back
    .then((res) => {
      dispatch({
        type: DELETE_CATEGORY_SUCCESS,
        payload: res.data,
      });
      dispatch(retrieveCategories());
    })
    .catch((err) =>
      dispatch({
        type: DELETE_CATEGORY_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
//Remove User
export const removeUserAction = (id, state) => (dispatch) => {
  setToken(); //to set the token in the header
  axios
    .delete(`/admin/remove_user/${state}/${id}`) //bind front and back
    .then((res) => {
      dispatch({
        type: REMOVE_USER_SUCCESS,
        payload: res.data,
      });
      dispatch(getUsers());
    })
    .catch((err) =>
      dispatch({
        type: REMOVE_USER_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
//retrieve messages
export const getMessages = () => (dispatch) => {
  setToken(); //to set the token in the header
  axios
    .get("/admin/messages") //bind front and back
    .then((res) =>
      dispatch({
        type: GET_MESSAGES_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_MESSAGES_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
//retrieve list of users
export const getUsers = () => (dispatch) => {
  setToken(); //to set the token in the header
  axios
    .get("/admin/users") //bind front and back
    .then((res) =>
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_USERS_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
//Delete Message
export const deleteMessageAction = (id) => (dispatch) => {
  setToken(); //to set the token in the header
  axios
    .delete(`/admin/delete_message/${id}`) //bind front and back
    .then((res) => {
      dispatch({
        type: DELETE_MESSAGE_SUCCESS,
        payload: res.data,
      });
      dispatch(getMessages());
    })
    .catch((err) =>
      dispatch({
        type: DELETE_MESSAGE_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
