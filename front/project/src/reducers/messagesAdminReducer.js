import {
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  LOGOUT,
} from "../actions/types";
const initState = {
  messages: null,
  errors: null,
};

const MessagesAdminReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_MESSAGES_SUCCESS:
      return { ...state, messages: action.payload };
    case GET_MESSAGES_FAIL:
      return { ...state, errors: action.payload };
    case LOGOUT:
      return { ...state, messages: null, errors: null };
    default:
      return state;
  }
};
export default MessagesAdminReducer;
