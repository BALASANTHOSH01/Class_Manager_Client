// utils.js
import { SET_ERROR, SET_ERROR_MESSAGE } from "../components/Auth/Login/loginReducers.js";

export const displayError = (localDispatch, messages) => {
  localDispatch({ type: SET_ERROR_MESSAGE, payload: messages });
  localDispatch({ type: SET_ERROR, payload: true });
  setTimeout(() => {
    localDispatch({ type: SET_ERROR, payload: false });
  }, 3000);
};
