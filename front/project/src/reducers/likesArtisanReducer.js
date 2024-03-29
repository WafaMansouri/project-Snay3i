import {
  GET_LIKES_ARTISAN_SUCCESS,
  GET_LIKES_ARTISAN_FAIL,
  LOGOUT,
} from "../actions/types";
const initState = {
  errors: null,
  likes: [],
};

const LikesArtisanReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_LIKES_ARTISAN_SUCCESS:
      return { ...state, likes: action.payload, errors: null };
    case GET_LIKES_ARTISAN_FAIL:
      return { ...state, likes: [], errors: action.payload };
    case LOGOUT:
      return { ...state, errors: null, likes: [] };
    default:
      return state;
  }
};
export default LikesArtisanReducer;
