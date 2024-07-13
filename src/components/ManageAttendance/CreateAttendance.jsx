import { useEffect, useReducer } from "react";
import { InputField, PopupMSG } from "../ReusableComponents";
import { formInputValidation } from "../../utils";
import {
  initialState,
  reducer,
  SET_ERROR,
  SET_ERROR_MESSAGE,
  SET_LOADING,
  SET_ATTENDANCE_DATA,
  SET_STUDENTS,
  SET_STAFFS,
  SET_STAFF_NAME,
  SET_STUDENT_ROLLNO,
  SET_STUDENT_ID,
  SET_STAFF_ID
} from "./attendanceReducers";
import { Loader } from "../Loader";
import { attendanceValidation } from "../../utils";
import { searchStaff, searchStudent, takeOneAttendance } from "../../api";
import { debounce } from "lodash";
import { useSelector } from "react-redux";

const CreateAttendance = () => {
  const [state, localDispatch] = useReducer(reducer, initialState);
  const { loading, errorMessage, error, attendanceData, staffs, students } =
    state;
  const existingUserType = useSelector((state) => state.user.currentUserType);
  const existingUser = useSelector((state) => state.user.currentUser);

  function getInstituteId() {
    if (existingUserType === "institute") {
      return existingUser._id;
    } else if (existingUserType === "staff") {
      return existingUser.institute;
    }
    return ""; // Ensure to return a default value if no condition matches
  }

  const InstituteId = getInstituteId();

  const handleChange = (e) => {
    const { name, value } = e.target;
    localDispatch({
      type: SET_ATTENDANCE_DATA,
      payload: { name, value },
    });

    if (name === "studentRollno") {
      debouncedSearchStudent(value);
    } else if (name === "staffName") {
      debouncedSearchStaff(value);
    }
  };

  // Staff Searching functionality with debounce
  const debouncedSearchStaff = debounce(async (staffName) => {
    if (staffName) {
      try {
        const staffList = await searchStaff(staffName);
        localDispatch({ type: SET_STAFFS, payload: staffList });
      } catch (error) {
        console.error("Error fetching staff list:", error);
      }
    }
  }, 300);

  // Student Searching functionality with debounce
  const debouncedSearchStudent = debounce(async (studentRollno) => {
    if (studentRollno) {
      try {
        const studentList = await searchStudent(studentRollno);
        localDispatch({ type: SET_STUDENTS, payload: studentList });
      } catch (error) {
        console.error("Error fetching student list:", error);
      }
    }
  }, 300);

  const closePopup = () => {
    localDispatch({ type: SET_ERROR, payload: false });
  };

  

  const handleStaffSelect = (staffName) => {
    localDispatch({ type: SET_STAFF_NAME, payload: staffName });
    localDispatch({ type: SET_STAFFS, payload: [] });
  };

  const handleStudentSelect = (studentRollno) => {
    localDispatch({ type: SET_STUDENT_ROLLNO, payload: studentRollno });
    localDispatch({ type: SET_STUDENTS, payload: [] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allAttendanceData = { ...attendanceData, institute: InstituteId };

    localDispatch({ type: SET_LOADING, payload: true });
    const errors = attendanceValidation(allAttendanceData);

    if (errors.length > 0) {
      localDispatch({ type: SET_ERROR_MESSAGE, payload: errors });
      localDispatch({ type: SET_ERROR, payload: true });
      localDispatch({ type: SET_LOADING, payload: false });
    } else {
      try {
        // create attendance using API
        // console.log("attendance status :" + attendanceData.status);

        localDispatch({
          type: SET_ATTENDANCE_DATA,
          payload: allAttendanceData,
        });

        // Object.values(allAttendanceData).map((attendance)=>{
        //   console.log("attendanceData : " + attendance);
        // });
        await takeOneAttendance(allAttendanceData);
        localDispatch({ type: SET_LOADING, payload: false });
        localDispatch({ type: SET_ERROR, payload: false });
        localDispatch({ type: SET_ERROR_MESSAGE, payload: [] });
      } catch (error) {
        localDispatch({
          type: SET_ERROR_MESSAGE,
          payload: ["Failed to create attendance"],
        });
        localDispatch({ type: SET_ERROR, payload: true });
        localDispatch({ type: SET_LOADING, payload: false });
      }
    }
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        {error && (
          <PopupMSG
            color={"bg-red-500"}
            errors={
              errorMessage.length > 0 ? errorMessage : "Invalid Credentials"
            }
            closePopup={closePopup}
          />
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-row justify-around items-start px-[2%] py-[3%] bg-gray-200 border w-[700px] h-[50vh] mx-auto mt-[6%]"
        >
          <div className="w-[45%]">
            <InputField
              name={"studentRollno"}
              handlechange={handleChange}
              value={attendanceData.studentRollno}
              error={error}
            />

            {students.length > 0 && (
              <ul className="absolute w-[300px] bg-white border mt-2 max-h-[150px] overflow-y-auto">
                {students.map((student) => (
                  <li
                    key={student._id}
                    onClick={() => handleStudentSelect(student.rollno)}
                    className="cursor-pointer p-2 hover:bg-gray-200"
                  >
                    {student.rollno}
                  </li>
                ))}
              </ul>
            )}

            <InputField
              name={"staffName"}
              handlechange={handleChange}
              value={attendanceData.staffName}
              error={error}
            />

            {staffs.length > 0 && (
              <ul className="absolute w-[300px] bg-white border mt-2 max-h-[150px] overflow-y-auto">
                {staffs.map((staff) => (
                  <li
                    key={staff._id}
                    onClick={() => handleStaffSelect(staff.name)}
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
              value={attendanceData.date}
              type={"date"}
              error={error}
            />
          </div>

          <div className="w-[45%]">
            <select
              id="status"
              name="status"
              className="outline-none px-[5px] py-[8px] my-[2%] mt-[6%] cursor-pointer w-[100%] border border-gray-400"
              value={attendanceData.status}
              onChange={handleChange}
            >
              <option value="" disabled>
                Status
              </option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="od/permission">OD / Permission</option>
            </select>
            <InputField
              name={"semester"}
              handlechange={handleChange}
              value={attendanceData.semester}
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
  }
};

export default CreateAttendance;
