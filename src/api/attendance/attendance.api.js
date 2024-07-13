import axiosInstance from "../../axios/axiosInstance";

export const takeOneAttendance = async (attendanceData) =>{
    try {

        Object.values(attendanceData).map((details)=>{
            console.log("attendanceData response : "+details);
        });
        
        const response =await axiosInstance.post('api/attendance/takeone',attendanceData);

        Object.values(response).map((details)=>{
            console.log("attendance response : "+details);
        });

        if(!response){
            return "No Attendance Found.";
        }

        return response.data;

    } catch (error) {
        console.log("Error taking attendance.");
        throw new Error;
    }
}