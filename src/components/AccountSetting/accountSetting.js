const SET_UPDATE_CURRENT_USER = "SET_UPDATE_CURRENT_USER"
const SET_ERROR = "SET_ERROR"
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"

const initialState = {
  currentUserDetails: {
    name: "",
    email: "",
    pincode: "",
    college_code: "",
    phoneNumber: "",
    parentNumber:"",
    institute: "",
    rollno: "",
    department: "",
    year: 0,
  },
  error:false,
  errorMessage:[]
};

const reducer = (state,action) =>{
    switch(action.type){
        case SET_UPDATE_CURRENT_USER:
            return {
                ...state,
                currentUserDetails:{
                    ...state.currentUserDetails,
                    [action.payload.name]:action.payload.value
                }
            };
        default:
            return state;
    }
};

export {initialState,reducer,SET_UPDATE_CURRENT_USER,SET_ERROR,SET_ERROR_MESSAGE}
