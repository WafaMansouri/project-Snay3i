import { UPDATE_INFO_SUCCESS, UPDATE_INFO_FAIL } from "./types";
import axios from "axios";
import setToken from "../setToken";
import { loadClient } from "./authActions";

//Update info
const updateAction = (info) => (dispatch) => {
  setToken(); //to set the token in the header

  axios
    .post("/api/update", info) //bind front and back
    .then((res) => {
      dispatch({
        type: UPDATE_INFO_SUCCESS,
        payload: res.data,
      });
      dispatch(loadClient());
    })
    .catch((err) =>
      dispatch({
        type: UPDATE_INFO_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
export default updateAction;
