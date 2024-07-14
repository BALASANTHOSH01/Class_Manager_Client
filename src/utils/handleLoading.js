// utils.js
import {SET_LOADING} from "../components/reducers/commonReducers";

const handleLoading = ({ dispatchFunction, loadingCondition }) => {
    if (typeof dispatchFunction === 'function') {
      dispatchFunction({
        type: SET_LOADING,
        payload: loadingCondition,
      });
    } else {
      console.error('dispatchFunction is not a function');
    }
  };

export default handleLoading;
