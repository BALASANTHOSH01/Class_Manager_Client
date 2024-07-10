import { Link } from "react-router-dom"
import attendanceDetails from "../../components/demoDetails/attendanceDetails/attendanceDetails"

const AttendanceManagement = () => {
  return (
    <div className=" grid grid-flow-col gap-3 p-[3%] overflow-hidden">
    {
      attendanceDetails.map((attendance)=>(
        <Link to={`/dashboard/manage-attendance/${attendance.student_id}`} key={attendance.rollno} className=" flex flex-col gap-1 px-[10%] py-[2px] w-[230px] h-[180px] bg-gray-200 border items-start justify-center cursor-pointer hover:shadow-lg">
          <h1>Student ID : {attendance.student_id}</h1>
          <h1>Staff ID : {attendance.staff_id}</h1>
          <h1>Status : {attendance.status}</h1>
          <h1>Date : {attendance.date}</h1>
        </Link>
      ))
    }
  </div>
  )
}

export default AttendanceManagement