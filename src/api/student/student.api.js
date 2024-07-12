import axiosInstance from "../../axios/axiosInstance";

export const createStudent = async (data, userType) => {
  try {
    if (userType === "institute" || userType === "staff") {
      const response = await axiosInstance.post(
        "/api/auth/student/register",
        data
      );

      if (!response) {
        return "Can't create student.";
      }

      console.log("response gotted :"+response);

      return response.data;
    }
  } catch (error) {
    console.error("Error updating institute:", error);
    throw error;
  }
};
