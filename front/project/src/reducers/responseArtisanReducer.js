import {
  RESPONSE_ARTISAN_SUCCESS,
  RESPONSE_ARTISAN_FAIL,
} from "../actions/types";
const initState = {
  errors: null,
  response: null,
};

const ResponseArtisanReducer = (state = initState, action) => {
  switch (action.type) {
    case RESPONSE_ARTISAN_SUCCESS:
      return { ...state, response: action.payload, errors: null };
    case RESPONSE_ARTISAN_FAIL:
      return { ...state, response: null, errors: action.payload };
    default:
      return state;
  }
};
export default ResponseArtisanReducer;
