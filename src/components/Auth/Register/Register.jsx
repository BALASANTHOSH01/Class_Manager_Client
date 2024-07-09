import { useState } from "react";
import { CommonFields, DynamicFields } from "../index.js";
import { PopupMSG } from "../../ReusableComponents/index.js";
import { filteredRegisterForm } from "../../../utils/index.js";
import { useDispatch } from "react-redux";
import {
  setCurrentUser,
  setIsAuthenticate,
} from "../../../features/user/userSlice.js";
import { createUser } from "../../../api/auth/auth.js";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    pincode: "",
    college_code: "",
    phoneNumber: "",
    institute: "",
    rollno: "",
    department: "",
    year: 0,
  });

  const [userType, setUserType] = useState("");
  const [formNumber, setFormNumber] = useState("one");
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const handleUserType = (type) => {
    setUserType(type);
  };

  const handleFormNumber = (number) => {
    if (formData.name && formData.email && formData.password && userType) {
      setFormNumber(number);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closePopup = () => {
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = filteredRegisterForm({ data: formData, userType: userType });

    try {
      const response = await createUser(data,userType);
      console.log("response :"+response);

      dispatch(setCurrentUser({ userData: data, userType: userType }));
      dispatch(setIsAuthenticate({isAuthenticate:true}));

      console.log("user created and set sucessfully.");

      if(!response){
        console.log("No response is found.");
      }

    } catch (error) {
      console.log("error message :" + error.message);
      throw new Error();
    }
  };

  // const userName = useSelector((state) => state.user.currentUser?.name); // Ensure accessing correct part of state
  // const usertype = useSelector((state) => state.user.currentUserType); // Ensure accessing correct part of state
  // const isAuth = useSelector((state) => state.user.isAuthenticate); // Ensure accessing correct part of state
  // console.log("userName: " + userName);
  // console.log("userType: " + usertype);
  // console.log("isAuth: " + isAuth);

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <PopupMSG
          color={"bg-red-500"}
          value={"All fields are required."}
          closePopup={closePopup}
        />
      )}
      {formNumber === "one" && (
        <CommonFields
          handleChange={handleChange}
          formData={formData}
          userType={userType}
          handleUserType={handleUserType}
          handleFormNumber={handleFormNumber}
        />
      )}
      {formNumber === "two" && (
        <DynamicFields
          userType={userType}
          handleChange={handleChange}
          formData={formData}
          setFormNumber={setFormNumber}
        />
      )}
    </form>
  );
};

export default Register;
