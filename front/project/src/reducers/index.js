import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import CategoryReducer from "./categoryReducer";
import addPostReducer from "./addPostReducer";
import SearchReducer from "./searchReducer";
import VisitReducer from "./visitReducer";
import RequestClientReducer from "./requestClientReducer";
import RequestArtisanReducer from "./requestArtisanReducer";
import ResponseArtisanReducer from "./responseArtisanReducer";

export default combineReducers({
  auth: AuthReducer,
  category: CategoryReducer,
  addPost: addPostReducer,
  search: SearchReducer,
  visit: VisitReducer,
  request_client: RequestClientReducer,
  request_artisan: RequestArtisanReducer,
  response_artisan: ResponseArtisanReducer,
});
