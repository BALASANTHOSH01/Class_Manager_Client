// utils.js or handleError.js
import { SET_ERROR, SET_ERROR_MESSAGE } from "../components/reducers/commonReducers";

// handleError.js
export const handleError = ({ dispatchFunction, errorMessages, condition }) => {
  if (typeof dispatchFunction === 'function') {
    dispatchFunction({
      type: SET_ERROR,
      payload: condition,
    });
    dispatchFunction({
      type: SET_ERROR_MESSAGE,
      payload: errorMessages,
    });
  } else {
    console.error('dispatchFunction is not a function');
  }
};

export default handleError;
