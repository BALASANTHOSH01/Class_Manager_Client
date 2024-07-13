import filteredRegisterForm from "./filteredRegisterForm";
import formInputValidation from "./formInputValidation";
import localStorage from "redux-persist/es/storage";
import handleError from "./handleError.js";
import attendanceValidation from "./attendanceValidation.js";
import { setToken,getToken,removeToken } from "./cookieFunctions.js";
import getInstituteId from "./getInstituteId.js";
import handleLoading from "./handleLoading.js";

export {filteredRegisterForm,formInputValidation,localStorage,handleError,attendanceValidation,setToken,getToken,removeToken,getInstituteId,handleLoading}