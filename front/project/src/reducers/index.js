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
});
