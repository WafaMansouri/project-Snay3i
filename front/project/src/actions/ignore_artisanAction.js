import { IGNORE_REQUEST_SUCCESS, IGNORE_REQUEST_FAIL } from "./types";
import axios from "axios";
import setToken from "../setToken";
// ignore the Request
export const ignore_artisanAction = (id_request) => (dispatch) => {
  setToken();
  axios
    .post("/artisan/ignore", { id_request }) //bind front and back
    .then((res) =>
      dispatch({
        type: IGNORE_REQUEST_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: IGNORE_REQUEST_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
