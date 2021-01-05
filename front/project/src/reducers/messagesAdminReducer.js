import {
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAIL,
  LOGOUT,
} from "../actions/types";
const initState = {
  messages: null,
  errors: null,
  deletedMessage: null,
};

const MessagesAdminReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_MESSAGES_SUCCESS:
      return { ...state, messages: action.payload, deletedMessage: null };
    case GET_MESSAGES_FAIL:
      return {
        ...state,
        errors: action.payload,
        messages: null,
        deletedMessage: null,
      };
    case DELETE_MESSAGE_SUCCESS:
      return { ...state, deletedMessage: action.payload, errors: null };
    case DELETE_MESSAGE_FAIL:
      return { ...state, deletedMessage: null, errors: action.payload };
    case LOGOUT:
      return { ...state, messages: null, errors: null };
    default:
      return state;
  }
};
export default MessagesAdminReducer;
