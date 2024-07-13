// utils.js
import {SET_ERROR,SET_ERROR_MESSAGE } from "../components/reducers/commonReducers";

const handleError = ({dispatchFuntion:dispatchFunction, errorMessages:errorMessages,condition:condition}) => {
  dispatchFunction({ type: SET_ERROR_MESSAGE, payload: errorMessages });
  dispatchFunction({ type: SET_ERROR, payload: condition });
  setTimeout(() => {
    dispatchFunction({ type: SET_ERROR, payload: condition });
  }, 3000);
};

export default handleError;
