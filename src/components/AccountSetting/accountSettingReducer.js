const SET_UPDATE_CURRENT_USER = "SET_UPDATE_CURRENT_USER";
const SET_ERROR = "SET_ERROR";
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
const SET_IS_EDITABLE = "SET_IS_EDITABLE";
const SET_DATA_UPDATE = "SET_DATA_UPDATE";


const initialState = {
  currentUserDetails: {
    name: "",
    email: "",
    pincode: "",
    college_code: "",
    phoneNumber: "",
    parentNumber: "",
    institute: "",
    rollno: "",
    department: "",
    year: 0,
  },
  error: false,
  errorMessage: [],
  isEdit: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUserDetails: {
          ...state.currentUserDetails,
          [action.payload.name]: action.payload.value,
        },
      };
    case SET_DATA_UPDATE:
        return {
            ...state,
            currentUserDetails: action.payload
          };
    case SET_IS_EDITABLE:
      return {
        ...state,
        isEdit: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export { initialState, reducer, SET_UPDATE_CURRENT_USER, SET_ERROR, SET_ERROR_MESSAGE, SET_IS_EDITABLE,SET_DATA_UPDATE };
