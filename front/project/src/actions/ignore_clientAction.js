import { IGNORE_REQUEST_SUCCESS, IGNORE_REQUEST_FAIL } from "./types";
import axios from "axios";
import setToken from "../setToken";
import { checkRequest_client } from "./clientActions";
import { sendNotificationAction } from "./sendNotificationAction";
// ignore the Request
export const ignore_clientAction = (request) => (dispatch) => {
  setToken();
  axios
    .post("/api/client/ignore", { id_request: request._id }) //bind front and back
    .then((res) => {
      dispatch({
        type: IGNORE_REQUEST_SUCCESS,
        payload: res.data,
      });
      dispatch(checkRequest_client());
      dispatch(sendNotificationAction(request.id_artisan._id));
    })
    .catch((err) =>
      dispatch({
        type: IGNORE_REQUEST_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
