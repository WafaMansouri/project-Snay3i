import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import CategoryReducer from "./categoryReducer";
import addPostReducer from "./addPostReducer";
import SearchReducer from "./searchReducer";
import VisitReducer from "./visitReducer";
import SendRequestReducer from "./sendRequestReducer";
import RequestArtisanReducer from "./requestArtisanReducer";
import RequestClientReducer from "./requestClientReducer";
import ResponseArtisanReducer from "./responseArtisanReducer";
import IgnoreReducer from "./ignoreReducer";
import AcceptReducer from "./acceptReducer";
import RateClientReducer from "./rateClientReducer";
import RateArtisanReducer from "./rateArtisanReducer";
import PostsReducer from "./postsReducer";
import UpdateReducer from "./updateReducer";
import LikesClientReducer from "./likesClientReducer";
import LikesArtisanReducer from "./likesArtisanReducer";

export default combineReducers({
  auth: AuthReducer,
  category: CategoryReducer,
  addPost: addPostReducer,
  search: SearchReducer,
  visit: VisitReducer,
  send_request: SendRequestReducer,
  request_artisan: RequestArtisanReducer,
  request_client: RequestClientReducer,
  response_artisan: ResponseArtisanReducer,
  ignore: IgnoreReducer,
  accept: AcceptReducer,
  rate_client: RateClientReducer,
  rate_artisan: RateArtisanReducer,
  posts: PostsReducer,
  update: UpdateReducer,
  likes_client: LikesClientReducer,
  likes_artisan: LikesArtisanReducer,
});
