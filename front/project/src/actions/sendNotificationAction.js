import { SEND_NOTIFICATION_SUCCESS, SEND_NOTIFICATION_FAIL } from "./types";
import axios from "axios";
import setToken from "../setToken";
import { loadClient } from "./authActions";

// Send Notification to the client
export const sendNotificationAction = (id) => (dispatch) => {
  setToken();
  axios
    .post("/api/send_notif", { id }) //bind front and back
    .then((res) =>
      dispatch({
        type: SEND_NOTIFICATION_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: SEND_NOTIFICATION_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
