import axiosInstance from "../../axios/axiosInstance";

const createStaff = async (data, userType) => {
  try {
    if (userType === "institute") {
      const response = await axiosInstance.post("api/auth/staff/register", data);
  
      if (!response) {
        return "No response is found.";
      }
  
      return response.data;
    }
  } catch (error) {
    console.log("Error creating staff");
    throw new Error();
  }
};

// find staff ID by using NAme
const findStaffIdByName = async (staffName, instituteID) => {
  try {
    const response = await axiosInstance.get(`/api/staff/${instituteID}/${staffName}`);
    if (!response) {
      return "No response found.";
    }
    return response.data._id;
  } catch (error) {
    console.log("Error finding staff");
    throw new Error();
  }
};


export {createStaff,findStaffIdByName};