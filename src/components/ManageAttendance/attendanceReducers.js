export const attendanceInitialState = {
  attendanceData: {
    student_id: "",
    rollno: "",
    staff_id: "",
    date: "",
    semester: "",
    status: "",
    staffName: "",
  },
  students: [],
  staffs: [],
  institute_id: "",
};

export const SET_ATTENDANCE_DATA = "SET_ATTENDANCE_DATA";
export const SET_STUDENTS = "SET_STUDENTS";
export const SET_STUDENT_ROLLNO = "SET_STUDENT_ROLLNO";
export const SET_STAFFS = "SET_STAFFS";
export const SET_STAFF_NAME = "SET_STAFF_NAME";
export const SET_INSTITUTE_ID = "SET_INSTITUTE_ID";
export const SET_STUDENT_ID = "SET_STUDENT_ID";
export const SET_STAFF_ID = "SET_STAFF_ID";

export const attendanceReducer = (state, action) => {
  switch (action.type) {
    case SET_ATTENDANCE_DATA:
      return {
        ...state,
        attendanceData: { ...state.attendanceData, [action.payload.name]: action.payload.value },
      };
    case SET_STUDENTS:
      return { ...state, students: action.payload };
    case SET_STUDENT_ROLLNO:
      return { ...state, attendanceData: { ...state.attendanceData, rollno: action.payload } };
    case SET_STAFFS:
      return { ...state, staffs: action.payload };
    // case SET_STAFF_NAME:
    //   return { ...state, staffName: action.payload };
    case SET_INSTITUTE_ID:
      return { ...state, attendanceData: { ...state.attendanceData, institute_id: action.payload } };
    case SET_STUDENT_ID:
      return { ...state, attendanceData: { ...state.attendanceData, student_id: action.payload } };
    case SET_STAFF_ID:
      return { ...state, attendanceData: { ...state.attendanceData, staff_id: action.payload } };
    default:
      return state;
  }
};
