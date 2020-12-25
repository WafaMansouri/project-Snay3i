import { SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAIL } from "./types";
import axios from "axios";

// send message to the admin
const sendMessageAction = (info) => (dispatch) => {
  axios
    .post("/api/send_message", { info })
    .then((res) => {
      dispatch({
        type: SEND_MESSAGE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: SEND_MESSAGE_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
export default sendMessageAction;
