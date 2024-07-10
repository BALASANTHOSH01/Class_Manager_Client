import { useState } from "react";
import { CommonFields, DynamicFields } from "../index.js";
import { PopupMSG } from "../../ReusableComponents/index.js";
import { filteredRegisterForm, formInputValidation } from "../../../utils/index.js";
import { useDispatch } from "react-redux";
import {
  setCurrentUser,
  setIsAuthenticate,
} from "../../../features/user/userSlice.js";
import { createUser } from "../../../api/auth/auth.js";
import Loader from "../../Loader/Loader.jsx";

const Register = () => {
  const dispatch = useDispatch();

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
  const [errorMessages, setErrorMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUserType = (type) => {
    setUserType(type);
  };

  const handleFormNumber = (number) => {
    if (formData.name && formData.email && formData.password && userType) {
      setFormNumber(number);
    } else {
      setErrorMessages(["Please fill out all required fields."]);
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

    const errors = formInputValidation(formData, userType);

    if (errors.length > 0) {
      setErrorMessages(errors);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }

    const data = filteredRegisterForm({ data: formData, userType: userType });

    setLoading(true);
    try {
      const response = await createUser(data, userType);

      if (!response) {
        console.log("No response is found.");
      }

      dispatch(setCurrentUser({ userData: data, userType: userType }));
      dispatch(setIsAuthenticate({ isAuthenticate: true }));
    } catch (error) {
      setErrorMessages([error.message]);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      setLoading(false);
      console.log("error message :" + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <form onSubmit={handleSubmit}>
        {error && (
          <PopupMSG
            color={"bg-red-500"}
            value={errorMessages.length > 0 ? errorMessages : "Invalid Credentials"}
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
            error={error}
          />
        )}

        {formNumber === "two" && (
          <DynamicFields
            userType={userType}
            handleChange={handleChange}
            formData={formData}
            setFormNumber={setFormNumber}
            error={error}
          />
        )}
      </form>
    );
  }
};

export default Register;
