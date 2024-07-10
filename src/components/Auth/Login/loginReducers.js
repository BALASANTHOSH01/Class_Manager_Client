export const SET_USER_TYPE = "SET_USER_TYPE";
export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
export const SET_ERROR= "SET_ERROR";
export const SET_LOADING = "SET_LOADING";

const initialState ={
    userType:"",
    errorMessage:[],
    error:false,
    loading:false
}

const reducer = (state,action) =>{
    switch(action.type){
        case SET_USER_TYPE:
            return {
                ...state,
                userType : action.payload,
            };
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage : action.payload,
            };
        case SET_ERROR:
            return {
                ...state,
                error : action.payload,
            };
        case SET_LOADING:
            return {
                ...state,
                loading : action.payload,
            };
        default:
            return state;
    }
}

export {reducer,initialState}