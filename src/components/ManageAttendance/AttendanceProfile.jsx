import { useParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import fetchAttendance from "../../utils/fetchAttendance";
import { getInstituteId } from "../../utils";
import { commonInitialState, commonReducer } from "../reducers/commonReducers";

const AttedanceProfile = () => {
  const { studentID, date } = useParams();
  const instituteId = getInstituteId();
  const [attendanceData, setAttendanceData] = useState([]);
  const [commonState, commonDispatch] = useReducer(commonReducer, commonInitialState);

  console.log("attendanceData : "+attendanceData);

  useEffect(() => {
    const fetchAndSetAttendance = async () => {
      await fetchAttendance(commonDispatch, setAttendanceData, date);
    };

    fetchAndSetAttendance();
  }, [date, instituteId, commonDispatch]);

  if (!Array.isArray(attendanceData) || attendanceData.length === 0) {
    return <div>Attendance data not found for the specified student ID.</div>;
  }

  const Attendance = attendanceData.find((attendance) => attendance.student_id === studentID);
  if (!Attendance) {
    return <div>Attendance data not found for the specified student ID.</div>;
  }

  return (
    <div className="w-[400px] h-[50vh] mx-auto mt-[5%] text-[18px] bg-gray-200 px-[3%] py-[2%]">
      <div className="flex flex-row gap-2 items-center">
        <h1>Student ID :</h1>
        <h1>{Attendance.student_id}</h1>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <h1>Status :</h1>
        <h1>{Attendance.status}</h1>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <h1>Semester :</h1>
        <h1>{Attendance.semester}</h1>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <h1>Institute :</h1>
        <h1>{Attendance.institute}</h1>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <h1>Staff ID :</h1>
        <h1>{Attendance.staff_id}</h1>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <h1>Date :</h1>
        <h1>{Attendance.date}</h1>
      </div>
    </div>
  );
};

export default AttedanceProfile;
