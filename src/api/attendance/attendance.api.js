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
};

export const getAttendanceByDate = async (date,institute) =>{
    try {

        const response = await axiosInstance.get(`/api/attendance/date/${date}`,institute);

        if(!response){
            return "No response is found.";
        }

        return response.data;
    } catch (error) {
        console.log("Error getting attendance.");
        throw new Error;
    }
};

export const getAttendanceByRollno = async (rollno,institute) =>{
    try {
        const response = await axiosInstance.get(`/api/attendance/${rollno}`,institute);
        if(!response){
            return "No response is found.";
        }

        return response.data;

    } catch (error) {
        console.log("Error taking attendance.");
        throw new Error;
    }
};