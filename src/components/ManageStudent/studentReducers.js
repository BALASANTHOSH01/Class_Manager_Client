export const localInitialState = {
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
  studentCreated: false,
};

export const SET_STUDENT_DATA = "SET_STUDENT_DATA";
export const RESET_STUDENT_DATA = "RESET_STUDENT_DATA";
export const SET_STUDENT_CREATED = "SET_STUDENT_CREATED";
export const SET_INSTITUTE = "SET_INSTITUTE";


export const localReducer = (state, action) => {
  switch (action.type) {
    case SET_STUDENT_DATA:
      return {
        ...state,
        studentData: {
          ...state.studentData,
          [action.payload.name]: action.payload.value,
        },
      };
    case RESET_STUDENT_DATA:
      return {
        ...state,
        studentData: localInitialState.studentData, // Reset to initial state
      };
    case SET_STUDENT_CREATED:
      return { ...state, studentCreated: action.payload };
    case SET_INSTITUTE:
      return {
        ...state,
        studentData: {
          ...state.studentData,
          institute: action.payload,
        },
      };
    default:
      return state;
  }
};
