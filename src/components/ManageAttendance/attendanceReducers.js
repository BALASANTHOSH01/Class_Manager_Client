export const initialState = {
  attendanceData: {
    student_id:"",
    staff_id:"",
    staffName: "",
    studentRollno: "",
    status: "",
    date: "",
    semester: "",
    institute: "",
  },
  loading: false,
  error: false,
  errorMessage: [],
  staffs: [],
  students: []
};

export const SET_ATTENDANCE_DATA = "SET_ATTENDANCE_DATA";
export const SET_ERROR = "SET_ERROR";
export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
export const SET_LOADING = "SET_LOADING";

export const SET_STAFF_ID = "SET_STAFF_ID";
export const SET_STAFFS = "SET_STAFFS";
export const SET_STAFF_NAME = "SET_STAFF_NAME";

export const SET_STUDENT_ID = "SET_STUDENT_ID";
export const SET_STUDENTS = "SET_STUDENTS";
export const SET_STUDENT_ROLLNO = "SET_STUDENT_ROLLNO";

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_ATTENDANCE_DATA: // ATTENDANCE DATA
      return {
        ...state,
        attendanceData: {
          ...state.attendanceData,
          [action.payload.name]: action.payload.value,
        },
      };
    case SET_LOADING: // LOADING
      return { ...state, loading: action.payload };
    case SET_ERROR: // ERROR
      return { ...state, error: action.payload };
    case SET_STUDENT_ID: // STUDENT LIST
      return { ...state, attendanceData: {
        ...state.attendanceData,
        student_id:action.payload
      } };
    case SET_STUDENTS: // STUDENT LIST
      return { ...state, students: action.payload };
    case SET_STUDENT_ROLLNO: // STUDENT ROLLNO
      return {
        ...state,
        attendanceData: {
          ...state.attendanceData,
          studentRollno: action.payload
        }
      };
    case SET_STAFFS: // STAFF LIST
      return { ...state, staffs: action.payload };
    case SET_STAFF_ID: // STAFF ID
      return { ...state, attendanceData: {
        ...state.attendanceData,
        staff_id: action.payload
      }};
    case SET_STAFF_NAME: // STAFF NAME
      return {
        ...state,
        attendanceData: {
          ...state.attendanceData,
          staffName: action.payload
        }
      };
    case SET_ERROR_MESSAGE: // ERROR MESSAGE
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};








