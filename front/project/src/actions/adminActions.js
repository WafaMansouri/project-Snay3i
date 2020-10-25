import { ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAIL } from "./types";
import axios from "axios";
import setToken from "../setToken";
export const addCategory = (newCategory) => (dispatch) => {
  setToken(); //to set the token in the header
  axios
    .post("/admin/category", newCategory) //bind front and back
    .then((res) =>
      dispatch({
        type: ADD_CATEGORY_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: ADD_CATEGORY_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
