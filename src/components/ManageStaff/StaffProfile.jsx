import { useParams } from "react-router-dom";
import staffDetails from "../demoDetails/staffDetails/staffDetails";


const StaffProfile = () => {
    const {name}=useParams();
    const staffData = staffDetails.find((staff)=>staff.name === name);
    if(!staffData){
        console.log("staff is not found.")
        throw new Error;
    }

  return (
    <div className="w-[400px] h-[50vh] mx-auto mt-[5%] text-[18px] bg-gray-200 px-[3%] py-[2%]">

        <div className=" flex flex-row gap-2 items-center">
            <h1>Name :</h1>
            <h1>{staffData.name}</h1>
        </div>

        <div className=" flex flex-row gap-2 items-center">
            <h1>Email :</h1>
            <h1>{staffData.email}</h1>
        </div>

        <div className=" flex flex-row gap-2 items-center">
            <h1>PhoneNumber :</h1>
            <h1>{staffData.phoneNumber}</h1>
        </div>

        <div className=" flex flex-row gap-2 items-center">
            <h1>Dept :</h1>
            <h1>{staffData.depart}</h1>
        </div>

        <div className=" flex flex-row gap-2 items-center">
            <h1>Institute :</h1>
            <h1>{staffData.institute}</h1>
        </div>

    </div>
  )
}

export default StaffProfile;