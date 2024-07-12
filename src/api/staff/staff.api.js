import axiosInstance from "../../axios/axiosInstance";

export const createStaff = async (data,userType)=>{
    
    if(userType === "institute"){
        const response = await axiosInstance.post('api/auth/staff/register',data);

        if(!response){
            return "No response is found."
        }

        return response.data;
    }
}