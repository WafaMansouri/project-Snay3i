import { IGNORE_REQUEST_SUCCESS, IGNORE_REQUEST_FAIL } from "./types";
import axios from "axios";
import setToken from "../setToken";
import { checkRequest_client } from "./clientActions";
// ignore the Request
export const ignore_clientAction = (id_request) => (dispatch) => {
  setToken();
  axios
    .post("/client/ignore", { id_request }) //bind front and back
    .then((res) => {
      dispatch({
        type: IGNORE_REQUEST_SUCCESS,
        payload: res.data,
      });
      dispatch(checkRequest_client());
    })
    .catch((err) =>
      dispatch({
        type: IGNORE_REQUEST_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
