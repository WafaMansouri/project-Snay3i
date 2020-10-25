import { ADD_POST_SUCCESS, ADD_POST_FAIL } from "./types";
import axios from "axios";
import setToken from "../setToken";
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
