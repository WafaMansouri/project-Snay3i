import { UPDATE_INFO_SUCCESS, UPDATE_INFO_FAIL } from "./types";
import axios from "axios";
import setToken from "../setToken";

//Update info
const updateAction = (info) => (dispatch) => {
  setToken(); //to set the token in the header

  axios
    .post("/update", info) //bind front and back
    .then((res) =>
      dispatch({
        type: UPDATE_INFO_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: UPDATE_INFO_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
export default updateAction;
