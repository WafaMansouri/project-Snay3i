import {
  GET_POSTS_ARTISAN_SUCCESS,
  GET_POSTS_ARTISAN_FAIL,
  LOGOUT,
} from "../actions/types";
const initState = {
  errors: null,
  posts: null,
};

const PostsReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_POSTS_ARTISAN_SUCCESS:
      return { ...state, posts: action.payload, errors: null };

    case GET_POSTS_ARTISAN_FAIL:
      return { ...state, posts: null, errors: action.payload };
    case LOGOUT:
      return { ...state, posts: null, errors: null };
    default:
      return state;
  }
};
export default PostsReducer;
