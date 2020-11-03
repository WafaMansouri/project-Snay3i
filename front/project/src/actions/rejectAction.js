import { REJECT_REQUEST_SUCCESS, REJECT_REQUEST_FAIL } from "./types";
import axios from "axios";
import setToken from "../setToken";
// ignore the Request
export const rejectAction = (id_request) => (dispatch) => {
  setToken();
  axios
    .post("/reject", { id_request }) //bind front and back
    .then((res) =>
      dispatch({
        type: REJECT_REQUEST_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: REJECT_REQUEST_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
