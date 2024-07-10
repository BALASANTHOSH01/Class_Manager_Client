export const initialState = {
  studentData: {
    name: "",
    email: "",
    password: "",
    rollno: "",
    year: 0,
    department: "",
    phoneNumber: "",
    parentNumber: "",
    institute: "",
  },
  loading: false,
  error: false,
  errorMessage: [],
};

export const SET_STUDENT_DATA = "SET_STUDENT_DATA";
export const SET_ERROR = "SET_ERROR";
export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
export const SET_LOADING = "SET_LOADING";

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_STUDENT_DATA:
      return {
        ...state,
        studentData: {
          ...state.studentData,
          [action.payload.name]: action.payload.value,
        },
      };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};
