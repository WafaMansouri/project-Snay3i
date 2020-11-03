import { GET_RATES_ARTISAN_SUCCESS, GET_RATES_ARTISAN_FAIL } from "./types";
import axios from "axios";
// To get ALL the rate of the visited artisan
export const artisanRatesAction = (id) => (dispatch) => {
  axios
    .get(`/artisan/rates/${id}`) //bind front and back
    .then((res) =>
      dispatch({
        type: GET_RATES_ARTISAN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_RATES_ARTISAN_FAIL,
        payload: err.response.data.errors[0].msg,
      })
    );
};
