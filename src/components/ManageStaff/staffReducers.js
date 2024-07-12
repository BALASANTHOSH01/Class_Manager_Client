export const initialState = {
    staffData: {
      name: "",
      email: "",
      password: "",
      department: "",
      phoneNumber: "",
      institute: "",
    },
    loading: false,
    error: false,
    errorMessage: [],
    staffCreated: false,
  };
  
  export const SET_STAFF_DATA = "SET_STAFF_DATA";
  export const SET_ERROR = "SET_ERROR";
  export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
  export const SET_LOADING = "SET_LOADING";
  export const SET_INSTITUTE_ID = "SET_INSTITUTE_ID";
  export const SET_STAFF_CREATED = "SET_STAFF_CREATED";
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case SET_STAFF_DATA:
        return {
          ...state,
          staffData: {
            ...state.staffData,
            [action.payload.name]: action.payload.value,
          },
        };
      case SET_LOADING:
        return { ...state, loading: action.payload };
      case SET_ERROR:
        return { ...state, error: action.payload };
      case SET_ERROR_MESSAGE:
        return { ...state, errorMessage: action.payload };
        case SET_STAFF_CREATED:
          return { ...state, staffCreated: action.payload };
      case SET_INSTITUTE_ID:
        return { 
          ...state, 
          staffData: {
            ...state.staffData,
            institute: action.payload,
          }
        };
      default:
        return state;
    }
  };
  