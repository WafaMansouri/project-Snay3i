import {
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  VISIT_PROFILE_SUCCESS,
  VISIT_PROFILE_FAIL,
  SEND_REQUEST_SUCCESS,
  SEND_REQUEST_FAIL,
  CHECK_REQUESTS_ARTISAN_SUCCESS,
  CHECK_REQUESTS_ARTISAN_FAIL,
  CHECK_REQUEST_CLIENT_SUCCESS,
  CHECK_REQUEST_CLIENT_FAIL,
} from "./types";
import axios from "axios";
import setToken from "../setToken";

export const searchByNameAction = (name) => (dispatch) => {
  //   setToken(); //to set the token in the header
  axios
    .get(`/search/${name}`) //bind front and back
    .then((res) =>
      dispatch({
        type: SEARCH_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: SEARCH_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
export const visitByIdAction = (id) => (dispatch) => {
  axios
    .get(`/visit/artisan/${id}`) //bind front and back
    .then((res) =>
      dispatch({
        type: VISIT_PROFILE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: VISIT_PROFILE_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
export const sendRequestAction = (requestInfo) => (dispatch) => {
  setToken();
  axios
    .post("/visit/request", requestInfo) //bind front and back
    .then((res) =>
      dispatch({
        type: SEND_REQUEST_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: SEND_REQUEST_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
// To get the information of a request if exists and if he visit the artisan
export const checkRequest_client = (id_artisan) => (dispatch) => {
  setToken();
  axios
    .get(`/visit/request/${id_artisan}`) //bind front and back
    .then((res) =>
      dispatch({
        type: CHECK_REQUEST_CLIENT_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: CHECK_REQUEST_CLIENT_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
// To get the information of requests if exist at the load App.js
// export const checkRequest_client = () => (dispatch) => {
//   setToken();
//   axios
//     .get("client/requests/") //bind front and back
//     .then((res) =>
//       dispatch({
//         type: CHECK_REQUESTS_CLIENT_SUCCESS,
//         payload: res.data,
//       })
//     )
//     .catch((err) =>
//       dispatch({
//         type: CHECK_REQUESTS_CLIENT_FAIL,
//         payload: err.response.data.errors[0].msg,
//       })
//     );
// };
