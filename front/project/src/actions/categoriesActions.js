import { ALL_CATEGORIES_SUCCESS, ALL_CATEGORIES_FAIL } from "./types";
import axios from "axios";
import setToken from "../setToken";
export const retrieveCategories = () => (dispatch) => {
  setToken(); //to set the token in the header
  axios
    .get("/category") //bind front and back
    .then((res) =>
      dispatch({
        type: ALL_CATEGORIES_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: ALL_CATEGORIES_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
