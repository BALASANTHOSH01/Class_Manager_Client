import axiosInstance from "../../axios/axiosInstance";

const createStudent = async (data, userType) => {
  try {
    if (userType === "institute" || userType === "staff") {
      const response = await axiosInstance.post(
        "/api/auth/student/register",
        data
      );

      if (!response) {
        return "Can't create student.";
      }

      console.log("response gotted :" + response);

      return response.data;
    }
  } catch (error) {
    console.error("Error updating institute:", error);
    throw error;
  }
};

// find studentID by using Rollno
const findStudentIDByRollno = async (studentRollno,instituteId) => {
  try {
    const response = await axiosInstance.get(`/api/students/${instituteId}/${studentRollno}`);

    if (!response) {
      return "No student found in this rollno.";
    }
    return response.data._id;
  } catch {
    console.log("Error getting student.");
    throw new Error();
  }
};

export {createStudent,findStudentIDByRollno};
