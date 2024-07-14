import axiosInstance from "../../axios/axiosInstance";

export const takeOneAttendance = async (attendanceData) =>{
    try {
        
        const response =await axiosInstance.post('api/attendance/takeone',attendanceData);

        if(!response){
            return "No Attendance Found.";
        }

        return response.data;

    } catch (error) {
        console.log("Error taking attendance.");
        throw new Error;
    }
}