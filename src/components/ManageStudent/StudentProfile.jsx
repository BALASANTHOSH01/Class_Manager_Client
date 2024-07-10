import { useParams } from "react-router-dom";
import studentDetails from "../demoDetails/studentsDetails/studentDetails";


const StudentProfile = () => {
    const {rollno}=useParams();
    const studentData = studentDetails.find((student)=>student.rollno === rollno);
    if(!studentData){
        console.log("student is not found.")
        throw new Error;
    }

  return (
    <div className="w-[400px] h-[50vh] mx-auto mt-[5%] text-[18px] bg-gray-200 px-[3%] py-[2%]">

        <div className=" flex flex-row gap-2 items-center">
            <h1>Name :</h1>
            <h1>{studentData.name}</h1>
        </div>

        <div className=" flex flex-row gap-2 items-center">
            <h1>Email :</h1>
            <h1>{studentData.email}</h1>
        </div>

        <div className=" flex flex-row gap-2 items-center">
            <h1>Rollno :</h1>
            <h1>{studentData.rollno}</h1>
        </div>

        <div className=" flex flex-row gap-2 items-center">
            <h1>Year :</h1>
            <h1>{studentData.Year}</h1>
        </div>

        <div className=" flex flex-row gap-2 items-center">
            <h1>Dept :</h1>
            <h1>{studentData.department}</h1>
        </div>

        <div className=" flex flex-row gap-2 items-center">
            <h1>Institute :</h1>
            <h1>{studentData.institute}</h1>
        </div>

    </div>
  )
}

export default StudentProfile;