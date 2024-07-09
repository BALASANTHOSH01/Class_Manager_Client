import axiosInstance from "../../axios/axiosInstance";

const createUser = async (userData, userType) => {
  try {
    const getResponse = async () => {
      switch (userType) {
        case "student":
          return await axiosInstance.post("/api/auth/student/register", userData);
        case "staff":
          return await axiosInstance.post("/api/auth/staff/register", userData);
        case "institute":
          return await axiosInstance.post("/api/auth/institute/register", userData);
        default:
          throw new Error("Invalid user type");
      }
    };

    const response = await getResponse(); // Ensure this is awaited
    if (!response) {
      console.log("No response is found.");
      throw new Error("No response received");
    }
    return response;
  } catch (error) {
    console.log("Error in creating user:", error);
    throw error; // Re-throw the error after logging it
  }
};

const loginUser = async(userData, userType) =>{
    try {
        const getResponse = async () => {
          switch (userType) {
            case "student":
              return await axiosInstance.post("/api/auth/student/login", userData);
            case "staff":
              return await axiosInstance.post("/api/auth/staff/login", userData);
            case "institute":
              return await axiosInstance.post("/api/auth/institute/login", userData);
            default:
              throw new Error("Invalid user type");
          }
        };
    
        const response = await getResponse(); // Ensure this is awaited
        if (!response) {
          console.log("No response is found.");
          throw new Error("No response received");
        }
        return response;
    } catch (error) {
        console.log("Error in login user:", error);
    throw error; // Re-throw the error after logging it
    }
}

export { createUser,loginUser };
