import axiosInstance from "../../axios/axiosInstance";

// search Institute
const searchInstitute = async (query) => {
    try {
        const response = await axiosInstance.get(`/api/search/institute?query=${query}`);
        return response.data;
    } catch (error) {
        console.log("Error searching institute.", error);
        throw new Error("Error searching institute.");
    }
};

// search Staff
const searchStaff = async (query) => {
    try {
        const response = await axiosInstance.get(`/api/search/staff?query=${query}`);
        return response.data;
    } catch (error) {
        console.log("Error searching staff.", error);
        throw new Error("Error searching staff.");
    }
};

// search Student
const searchStudent = async (query) => {
    try {
        const response = await axiosInstance.get(`/api/search/student?query=${query}`);
        return response.data;
    } catch (error) {
        console.log("Error searching student.", error);
        throw new Error("Error searching student.");
    }
};

export {searchStudent,searchStaff,searchInstitute}
