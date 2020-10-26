import { SEARCH_SUCCESS, SEARCH_FAIL } from "./types";
import axios from "axios";
// import setToken from "../setToken";
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
