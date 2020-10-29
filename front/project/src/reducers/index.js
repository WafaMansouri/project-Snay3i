import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import CategoryReducer from "./categoryReducer";
import addPostReducer from "./addPostReducer";
import SearchReducer from "./searchReducer";
import VisitReducer from "./visitReducer";
import RequestReducer from "./requestReducer";

export default combineReducers({
  auth: AuthReducer,
  category: CategoryReducer,
  addPost: addPostReducer,
  search: SearchReducer,
  visit: VisitReducer,
  request: RequestReducer,
});
