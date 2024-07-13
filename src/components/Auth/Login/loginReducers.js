export const SET_USER_TYPE = "SET_USER_TYPE";
export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
export const SET_ERROR= "SET_ERROR";
export const SET_LOADING = "SET_LOADING";

const loginInitialState ={
    userType:"",
}

const loginReducer = (state,action) =>{
    switch(action.type){
        case SET_USER_TYPE:
            return {
                ...state,
                userType : action.payload,
            };
        default:
            return state;
    }
}

export {loginReducer,loginInitialState}