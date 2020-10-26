import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import CategoryReducer from "./categoryReducer";
import addPostReducer from "./addPostReducer";
import SearchReducer from "./searchReducer";

export default combineReducers({
  auth: AuthReducer,
  category: CategoryReducer,
  addPost: addPostReducer,
  search: SearchReducer,
});
