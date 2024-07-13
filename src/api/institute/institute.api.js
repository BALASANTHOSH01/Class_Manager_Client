import axiosInstance from "../../axios/axiosInstance";

// Function to update the institute
const updateInstitute = async (updatedData, id) => {

  const Data = {
    id:id,
    updates: updatedData, // Send updates directly without nesting
  };

  try {
    const response = await axiosInstance.patch(`/api/institute/update`, Data);

    if (!response) {
      console.log("Failed to update institute.");
      throw new Error("Update failed");
    }

    return response.data; // Return the response data
  } catch (error) {
    console.error("Error updating institute:", error);
    throw error;
  }
};

// Function to get institute details
const getInstitute = async (collegeCode) => {
  try {
    const response = await axiosInstance.get(`/api/institute/college-code/${collegeCode}`);

    if (response.status !== 200) {
      console.log("Institute not found.");
      throw new Error("Institute not found");
    }

    return response.data; // Return the Institute data
  } catch (error) {
    console.error("Error getting institute:", error);
    throw error;
  }
};

// find instituteID by Name
const findInstituteIDByName= async(instituteName) =>{
  try {
    const response = await axiosInstance.get(`/api/institute/${instituteName}`);
    if(!response){
      return "No institute found.";
    }
    return response.data._id; // return institute ID
  } catch (error) {
    console.error("Error getting institute:", error);
    throw error;
  }
}

export { updateInstitute, getInstitute,findInstituteIDByName };
