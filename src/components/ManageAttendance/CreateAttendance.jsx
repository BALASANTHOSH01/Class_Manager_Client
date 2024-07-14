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

import {
  commonInitialState,
  commonReducer,
  SET_ERROR,
  SET_ERROR_MESSAGE,
  SET_LOADING,
} from "../reducers/commonReducers";

import { Loader } from "../Loader";
import { attendanceValidation } from "../../utils";
import { searchStaff, searchStudent, takeOneAttendance } from "../../api";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import useExistingUserData from "../../hooks/useExistingUserData";

const CreateAttendance = () => {
  const [attendanceState, attendanceDispatch] = useReducer(
    attendanceReducer,
    attendanceInitialState
  );

  const [commonState, commonDispatch] = useReducer(
    commonReducer,
    commonInitialState
  );

  const { loading, error, errorMessage } = commonState;

  const { existingUser, existingUserType } = useExistingUserData();

  const getInstituteId = (userType, user) => {
    if (userType === 'institute') {
      return user._id;
    } else if (userType === 'staff') {
      return user.institute;
    }
    return '';
  };

  const InstituteId = getInstituteId(existingUserType, existingUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    attendanceDispatch({
      type: SET_ATTENDANCE_DATA,
      payload: { name, value },
    });
  };

  const debouncedSearchStaff = useCallback(
    debounce(async (staffName) => {
      if (staffName) {
        try {
          const staffList = await searchStaff(staffName, InstituteId);
          attendanceDispatch({ type: SET_STAFFS, payload: staffList });
        } catch (error) {
          console.error("Error fetching staff list:", error);
          commonDispatch({
            type: SET_ERROR,
            payload: true,
          });
          commonDispatch({
            type: SET_ERROR_MESSAGE,
            payload: "Error fetching staff list.",
          });
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
          commonDispatch({
            type: SET_ERROR,
            payload: true,
          });
          commonDispatch({
            type: SET_ERROR_MESSAGE,
            payload: "Error fetching student list.",
          });
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
    attendanceDispatch({ type: SET_STAFF_NAME, payload: staffName });
    attendanceDispatch({ type: SET_STAFFS, payload: [] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    attendanceDispatch({ type: SET_INSTITUTE_ID, payload: InstituteId });

    const allAttendanceData = { ...attendanceState.attendanceData, institute: InstituteId };

    commonDispatch({ type: SET_LOADING, payload: true });
    const errors = attendanceValidation(allAttendanceData);

    if (errors.length > 0) {
      commonDispatch({
        type: SET_ERROR,
        payload: true,
      });
      commonDispatch({
        type: SET_ERROR_MESSAGE,
        payload: errors,
      });
      commonDispatch({ type: SET_LOADING, payload: false });
    } else {
      try {
        await takeOneAttendance(allAttendanceData);
        commonDispatch({
          type: SET_ERROR,
          payload: false,
        });
        commonDispatch({
          type: SET_ERROR_MESSAGE,
          payload: [],
        });
        commonDispatch({ type: SET_LOADING, payload: false });
      } catch (error) {
        commonDispatch({
          type: SET_ERROR,
          payload: true,
        });
        commonDispatch({
          type: SET_ERROR_MESSAGE,
          payload: ["Failed to create attendance"],
        });
        commonDispatch({ type: SET_LOADING, payload: false });
      }
    }
  };

  const closePopup = () => {
    commonDispatch({
      type: SET_ERROR,
      payload: false,
    });
  };

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
      <form
        onSubmit={handleSubmit}
        className="flex flex-row justify-around items-start px-[2%] py-[3%] bg-gray-200 border w-[700px] h-[50vh] mx-auto mt-[6%]"
      >
        <div className="w-[45%] relative">
          <InputField
            name={"rollno"}
            handlechange={handleStudentRollno}
            value={attendanceState.attendanceData.rollno}
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
            name={"staffName"}
            handlechange={handleStaffName}
            value={attendanceState.staffName}
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
            name={"date"}
            handlechange={handleChange}
            value={attendanceState.attendanceData.date}
            type={"date"}
            error={error}
          />
        </div>
        <div className="w-[45%]">
          <select
            id="status"
            name="status"
            className="outline-none px-[5px] py-[8px] my-[2%] mt-[6%] cursor-pointer w-[100%] border border-gray-400"
            value={attendanceState.attendanceData.status}
            onChange={handleChange}
          >
            <option value="" disabled>Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="od/permission">OD / Permission</option>
          </select>
          <InputField
            name={"semester"}
            handlechange={handleChange}
            value={attendanceState.attendanceData.semester}
            error={error}
          />
          <button
            type="submit"
            className="w-[100%] py-[3%] px-[2%] text-center border bg-[--primary-purpel] mt-[9%] text-white"
          >
            Create attendance
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateAttendance;
