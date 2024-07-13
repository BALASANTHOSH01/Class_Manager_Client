//attendance API
import { takeOneAttendance } from "./attendance/attendance.api";

// student API calls
import { createStudent ,findStudentIDByRollno} from "./student/student.api";

// staff API calls
import { createStaff,findStaffIdByName } from "./staff/staff.api";

// institute API calls
import { updateInstitute,findInstituteIDByName } from "./institute/institute.api";

// searching
import {
  searchInstitute,
  searchStaff,
  searchStudent,
} from "./search/search.api";


export {

  // create
  createStudent,
  createStaff,

  //update
  updateInstitute,

  //search
  searchInstitute,
  searchStaff,
  searchStudent,

  // attendance
  takeOneAttendance,

  // find ID
  findStudentIDByRollno,
  findStaffIdByName,
  findInstituteIDByName
};
