import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import CommonFields from "./Register/CommonFields/CommonFields.jsx";
import DynamicFields from "./Register/DynamicFields/DynamicFields.jsx";

import {
  reducer,
  initialState,
  SET_ERROR,
  SET_ERROR_MESSAGE,
  SET_FORM_NUMBER,
  SET_LOADING,
  SET_USER_TYPE,
} from "./Register/registerReducers.js";

export { Login, Register, CommonFields, DynamicFields,reducer, initialState, SET_ERROR, SET_ERROR_MESSAGE, SET_FORM_NUMBER, SET_LOADING, SET_USER_TYPE, };
