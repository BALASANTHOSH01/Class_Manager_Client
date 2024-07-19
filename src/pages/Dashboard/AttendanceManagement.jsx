import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ReusableComponents/Button";
import { IoMdAdd as PlusIcon } from "react-icons/io";
import useExistingUserData from "../../hooks/useExistingUserData";
import { commonInitialState, commonReducer } from "../../components/reducers/commonReducers";
import AttendanceCard from "../../components/ReusableComponents/AttendanceCard";
import fetchAttendance from "../../utils/fetchAttendance";
import { Loader } from "../../components/Loader";
import { PopupMSG } from "../../components/ReusableComponents";
import { getInstituteId, handleError } from "../../utils";

const AttendanceManagement = () => {
  const { existingUserType, existingUser } = useExistingUserData();
  const [attendanceData, setAttendanceData] = useState([]);
  const [commonState, commonDispatch] = useReducer(commonReducer, commonInitialState);
  const { loading, error, errorMessage } = commonState;

  const date = "15-07-2024";
  const instituteId = getInstituteId(existingUserType, existingUser);

  console.log("userType :"+existingUserType);
  console.log("userData :"+Object.values(existingUser).map((data)=>data));

  useEffect(() => {
    fetchAttendance(commonDispatch, setAttendanceData, date);
  }, [date, instituteId, commonDispatch]);

  console.log("attendanceData :"+attendanceData);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <PopupMSG
        errors={errorMessage}
        closePopup={() => {
          handleError(commonDispatch, [], false);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2 items-start w-[100%]">
      <div>
        <Button
          icon={<PlusIcon />}
          pageLink={"/dashboard/create-attendance"}
          text={"Create Attendance"}
          className="text-white bg-[--primary-purpel] w-[200px] absolute top-[5%] right-[5%]"
        />
      </div>

      {attendanceData.length > 0 && (
        <div className="flex flex-row items-center gap-3 w-[100%] mt-[5%]">
          <hr className="h-[2px] w-[100%] bg-gray-300" />
          <div className="flex flex-row items-center gap-2 text-[20px]">
            <p>Date</p>:
            <p>
              {new Date(attendanceData[0].attendance[0].date).toLocaleDateString()}
            </p>
          </div>
          <hr className="h-[2px] w-[100%] bg-gray-300" />
        </div>
      )}

      <div className="mt-[1%] grid grid-flow-col gap-3 p-[3%]">
        {attendanceData.length > 0 ? (
          attendanceData.map((attendance) => {
            const { _id, student, rollno, semester, attendance: [attDetail] } = attendance;
            const { status, date, staff } = attDetail;

            return (
              <Link
                to={`/dashboard/manage-attendance/${date}/${student._id}`}
                key={_id}
                className="flex flex-col gap-1 px-[10%] py-[2px] w-[350px] h-[300px] bg-gray-200 border items-start justify-center cursor-pointer hover:shadow-lg"
              >
                <AttendanceCard name={"Student Name"} value={student.name} />
                <AttendanceCard name={"Rollno"} value={rollno} />
                <AttendanceCard name={"Department"} value={student.department} />
                <AttendanceCard name={"Year"} value={student.year} />
                <AttendanceCard name={"Semester"} value={semester} />
                <AttendanceCard name={"Status"} value={status} />
                <AttendanceCard name={"Date"} value={new Date(date).toLocaleDateString()} />
                <AttendanceCard name={"Staff Name"} value={staff.name} />
              </Link>
            );
          })
        ) : (
          <div>No attendance records found.</div>
        )}
      </div>
    </div>
  );
};

export default AttendanceManagement;
