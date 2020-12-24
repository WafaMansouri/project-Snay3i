import { IGNORE_REQUEST_SUCCESS, IGNORE_REQUEST_FAIL } from "./types";
import axios from "axios";
import setToken from "../setToken";
import { sendNotificationAction } from "./sendNotificationAction";
import { checkRequest_artisan } from "./artisanActions";
// ignore the Request
export const ignore_artisanAction = (request) => (dispatch) => {
  setToken();
  axios
    .post("/artisan/ignore", { id_request: request._id }) //bind front and back
    .then((res) => {
      dispatch({
        type: IGNORE_REQUEST_SUCCESS,
        payload: res.data,
      });
      dispatch(checkRequest_artisan());
      dispatch(sendNotificationAction(request.id_client._id));
    })
    .catch((err) =>
      dispatch({
        type: IGNORE_REQUEST_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
