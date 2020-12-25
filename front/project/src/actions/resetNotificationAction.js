import { RESET_NOTIFICATION_SUCCESS, RESET_NOTIFICATION_FAIL } from "./types";
import axios from "axios";
import setToken from "../setToken";
import { loadClient } from "./authActions";

// Reset Notifications
export const resetNotificationAction = () => (dispatch) => {
  setToken();
  axios
    .post("/api/reset_notif") //bind front and back
    .then((res) => {
      dispatch({
        type: RESET_NOTIFICATION_SUCCESS,
        payload: res.data,
      });
      dispatch(loadClient());
    })
    .catch((err) =>
      dispatch({
        type: RESET_NOTIFICATION_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
