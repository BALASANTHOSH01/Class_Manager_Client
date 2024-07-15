import React, { useReducer, useCallback } from "react";
import { InputField, PopupMSG } from "../ReusableComponents";
import {
  attendanceInitialState,
  attendanceReducer,
  SET_ATTENDANCE_DATA,
  SET_STUDENTS,
  SET_STUDENT_ROLLNO,
  SET_STAFFS,
  SET_STAFF_NAME,
  SET_INSTITUTE_ID,
  SET_STUDENT_ID,
  SET_STAFF_ID,
} from "./attendanceReducers";
import { commonInitialState, commonReducer } from "../reducers/commonReducers";
import { Loader } from "../Loader";
import { attendanceValidation, getInstituteId, handleError, handleLoading } from "../../utils";
import { searchStaff, searchStudent, takeOneAttendance } from "../../api";
import { debounce } from "lodash";
import useExistingUserData from "../../hooks/useExistingUserData";

const CreateAttendance = () => {
  const [attendanceState, attendanceDispatch] = useReducer(attendanceReducer, attendanceInitialState);
  const { staffName,attendanceData } = attendanceState;

  const [commonState, commonDispatch] = useReducer(commonReducer, commonInitialState);
  const { loading, error, errorMessage } = commonState;

  const { existingUser, existingUserType } = useExistingUserData();
  const InstituteId = getInstituteId(existingUserType, existingUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    attendanceDispatch({ type: SET_ATTENDANCE_DATA, payload: { name, value } });
  };

  const debouncedSearchStaff = useCallback(
    debounce(async (staffName) => {
      if (staffName) {
        try {
          const staffList = await searchStaff(staffName, InstituteId);
          attendanceDispatch({ type: SET_STAFFS, payload: staffList });
        } catch (error) {
          console.error("Error fetching staff list:", error);
          handleError(commonDispatch, ["Error fetching staff list."], true);
        }
      } else {
        attendanceDispatch({ type: SET_STAFFS, payload: [] });
      }
    }, 300),
    [InstituteId]
  );

  const debouncedSearchStudent = useCallback(
    debounce(async (studentRollno) => {
      if (studentRollno) {
        try {
          const studentList = await searchStudent(studentRollno, InstituteId);
          attendanceDispatch({ type: SET_STUDENTS, payload: studentList });
        } catch (error) {
          console.error("Error fetching student list:", error);
          handleError(commonDispatch, ["Error fetching student list."], true);
        }
      } else {
        attendanceDispatch({ type: SET_STUDENTS, payload: [] });
      }
    }, 300),
    [InstituteId]
  );

  const handleStudentRollno = (e) => {
    const { value } = e.target;
    handleChange(e);
    debouncedSearchStudent(value);
  };

  const handleStaffName = (e) => {
    const { value } = e.target;
    handleChange(e);
    debouncedSearchStaff(value);
  };

  const handleStudentSelect = (rollno, studentId) => {
    attendanceDispatch({ type: SET_STUDENT_ID, payload: studentId });
    attendanceDispatch({ type: SET_STUDENT_ROLLNO, payload: rollno });
    attendanceDispatch({ type: SET_STUDENTS, payload: [] });
  };

  const handleStaffSelect = (staffName, staffId) => {
    attendanceDispatch({ type: SET_STAFF_ID, payload: staffId });
    attendanceDispatch({ type: SET_STAFF_NAME, payload: attendanceData.staffName });
    attendanceDispatch({ type: SET_STAFFS, payload: [] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    attendanceDispatch({ type: SET_INSTITUTE_ID, payload: InstituteId });

    const allAttendanceData = {
      student_id:attendanceData.student_id ,
      rollno: attendanceData.rollno,
      staff_id: attendanceData.staff_id,
      date: attendanceData.date,
      semester: attendanceData.semester,
      status: attendanceData.status,
      institute: InstituteId,
    };

    const errors = attendanceValidation(allAttendanceData);

    if (errors.length > 0) {
      handleLoading(commonDispatch, false);
      handleError(commonDispatch, errors, true);
      
      setTimeout(() => {
        handleError(commonDispatch, errors, false);
      }, 2000);

      console.log("error :"+errorMessage);


    } else {
      try {
        handleLoading(commonDispatch, true);
        
        const resposne = await takeOneAttendance(allAttendanceData);

        if(!resposne){
          return "No resposen found."
        }

        handleError(commonDispatch, [], false);
        handleLoading(commonDispatch, false);
      } catch (error) {
        handleError(commonDispatch, ["Failed to create attendance"], true);
        handleLoading(commonDispatch, false);
        setTimeout(() => {
          handleError(commonDispatch, [], false);
        }, 2000);
      }
    }
  };

  const closePopup = () => {
    handleError(commonDispatch, [], false);
  };

  if(loading){
    return <Loader />
  } else {

  return (
    <>
      {error && (
        <PopupMSG
          color="bg-red-500"
          errors={errorMessage.length > 0 ? errorMessage : "Invalid Credentials"}
          closePopup={closePopup}
        />
      )}
      {loading && <Loader />}
      <form onSubmit={handleSubmit} className="flex flex-row justify-around items-start px-[2%] py-[3%] bg-gray-200 border w-[700px] h-[50vh] mx-auto mt-[6%]">
        <div className="w-[45%] ">
          <InputField
            name="rollno"
            handlechange={handleStudentRollno}
            value={attendanceData.rollno}
            error={error}
          />
          {attendanceState.students.length > 0 && (
            <ul className="absolute w-[300px] bg-white border mt-2 max-h-[150px] overflow-y-auto">
              {attendanceState.students.map((student) => (
                <li
                  key={student._id}
                  onClick={() => handleStudentSelect(student.rollno, student._id)}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                >
                  {student.rollno}
                </li>
              ))}
            </ul>
          )}
          <InputField
            name="staffName"
            handlechange={handleStaffName}
            value={attendanceData.staffName}
            error={error}
          />
          {attendanceState.staffs.length > 0 && (
            <ul className="absolute w-[300px] bg-white border mt-2 max-h-[150px] overflow-y-auto">
              {attendanceState.staffs.map((staff) => (
                <li
                  key={staff._id}
                  onClick={() => handleStaffSelect(staff.name, staff._id)}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                >
                  {staff.name}
                </li>
              ))}
            </ul>
          )}
          <InputField
            name="date"
            handlechange={handleChange}
            value={attendanceData.date}
            type="date"
            error={error}
          />
        </div>
        <div className="w-[45%] mt-[4%] ">
          <select
            id="status"
            name="status"
            className={`outline-none px-[5px] py-[8px] border text-[16px] w-full ${error && "border-red-500 border-[2px]"}`}
            value={attendanceData.status}
            onChange={handleChange}
          >
            <option value="">Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
          <InputField
            name="semester"
            handlechange={handleChange}
            value={attendanceData.semester}
            error={error}
          />
          <button type="submit" className="w-[100%] py-[3%] px-[2%] text-center border bg-[--primary-purpel] mt-[10%] text-white">
            Create Attendance
          </button>
        </div>
      </form>
    </>
  );
};
}

export default CreateAttendance;
