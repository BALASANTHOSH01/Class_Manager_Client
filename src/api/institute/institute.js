import axiosInstance from "../../axios/axiosInstance";

const updateInstitute = async (updatedData,collegeCode) => {
    const response = await axiosInstance.post(
        `/api/institute/update`,updatedData
      );
    
      if (!response) {
        console.log("No institute is found.");
        throw new Error("No response received");
      }
    
      return response;
};

const getInstitute = async (collegeCode) => {
  const response = await axiosInstance.get(
    `/api/institute/college-code/${collegeCode}`
  );

  if (!response) {
    console.log("No institute is found.");
    throw new Error("No response received");
  }

  return response;
};

export {updateInstitute,getInstitute}
