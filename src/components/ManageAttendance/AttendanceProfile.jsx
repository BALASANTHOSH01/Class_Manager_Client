import { useParams } from "react-router-dom";
import attendanceDetails from "../demoDetails/attendanceDetails/attendanceDetails";


const AttedanceProfile = () => {
    const {studentID}=useParams();
    const attendanceData = attendanceDetails.find((attendance)=>attendance.student_id === studentID);
    if(!attendanceData){
        console.log("attendance is not found.")
        throw new Error;
    }

  return (
    <div className="w-[400px] h-[50vh] mx-auto mt-[5%] text-[18px] bg-gray-200 px-[3%] py-[2%]">

        <div className=" flex flex-row gap-2 items-center">
            <h1>Student ID :</h1>
            <h1>{attendanceData.student_id}</h1>
        </div>

        <div className=" flex flex-row gap-2 items-center">
            <h1>Status :</h1>
            <h1>{attendanceData.status}</h1>
        </div>

        <div className=" flex flex-row gap-2 items-center">
            <h1>Semester :</h1>
            <h1>{attendanceData.semester}</h1>
        </div>

        <div className=" flex flex-row gap-2 items-center">
            <h1>Institute :</h1>
            <h1>{attendanceData.institute}</h1>
        </div>

        <div className=" flex flex-row gap-2 items-center">
            <h1>Staff ID :</h1>
            <h1>{attendanceData.staff_id}</h1>
        </div>

        <div className=" flex flex-row gap-2 items-center">
            <h1>Date :</h1>
            <h1>{attendanceData.date}</h1>
        </div>

    </div>
  )
}

export default AttedanceProfile;