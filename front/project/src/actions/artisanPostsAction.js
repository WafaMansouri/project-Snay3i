import { GET_POSTS_ARTISAN_SUCCESS, GET_POSTS_ARTISAN_FAIL } from "./types";
import axios from "axios";
// To get ALL the rate of the visited artisan
export const artisanPostsAction = (id) => (dispatch) => {
  axios
    .get(`/artisan/posts/${id}`) //bind front and back
    .then((res) =>
      dispatch({
        type: GET_POSTS_ARTISAN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POSTS_ARTISAN_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
