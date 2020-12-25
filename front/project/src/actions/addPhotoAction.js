import { ADD_PHOTO_SUCCESS, ADD_PHOTO_FAIL } from "./types";
import axios from "axios";
import setToken from "../setToken";
import { loadClient } from "./authActions";
// To make a post
const addPhotoAction = (file, config) => (dispatch) => {
  setToken(); //to set the token in the header
  let formData = new FormData();
  formData.append("avatar", file);

  axios
    .post("/api/add_photo", formData, config) //bind front and back
    .then((res) => {
      dispatch({
        type: ADD_PHOTO_SUCCESS,
        payload: res.data,
      });
      dispatch(loadClient());
    })
    .catch((err) =>
      dispatch({
        type: ADD_PHOTO_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
export default addPhotoAction;
