// utils.js
import {SET_LOADING} from "../components/reducers/commonReducers";

const handleLoading = ({dispatchFunction,loadingCondition}) =>{
    dispatchFunction({type:SET_LOADING,payload:loadingCondition});
};

export default handleLoading;
