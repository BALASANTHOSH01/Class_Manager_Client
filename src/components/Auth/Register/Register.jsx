// installed modules
import { useReducer, useState } from "react";
import { useDispatch } from "react-redux";

// loader component
import Loader from "../../Loader/Loader.jsx";

// popup error indicator component
import { PopupMSG } from "../../ReusableComponents/index.js";

// utility part
import {
  filteredRegisterForm,
  formInputValidation,
} from "../../../utils/index.js";

// redux part
import {
  setCurrentUser,
  setIsAuthenticate,
} from "../../../features/user/userSlice.js";

// create user
import { createUser } from "../../../api/auth/auth.js";

// index file
import {
  CommonFields,
  DynamicFields,
  SET_ERROR,
  SET_ERROR_MESSAGE,
  SET_FORM_NUMBER,
  SET_USER_TYPE,
  SET_LOADING,
  reducer,
  initialState,
} from "../index.js";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  // useReducer part
  const [state, localDispatch] = useReducer(reducer, initialState);

  // destructured state
  const { userType, formNumber, error, errorMessages, loading } = state;

  // form data state
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

  // handle user type
  const handleUserType = (type) => {
    localDispatch({ type: SET_USER_TYPE, payload: type });
  };

  // handle form number
  const handleFormNumber = (number) => {
    if (formData.name && formData.email && formData.password && userType) {
      localDispatch({ type: SET_FORM_NUMBER, payload: number });
    } else {
      displayError(["Please fill out all required fields."]);
    }
  };

  // updating state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle back
  const handleBackForm = (formNumber) => {
    localDispatch({ type: SET_FORM_NUMBER, payload: formNumber });
  };

  // close popup
  const closePopup = () => {
    localDispatch({ type: SET_ERROR, payload: false });
  };

  //display error
  const displayError = (messages) => {
    localDispatch({ type: SET_ERROR_MESSAGE, payload: messages });
    localDispatch({ type: SET_ERROR, payload: true });
    setTimeout(() => {
      localDispatch({ type: SET_ERROR, payload: false });
    }, 3000);
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = formInputValidation(formData, userType);

    if (errors.length > 0) {
      displayError(errors);
      return;
    }

    // filter register form
    const data = filteredRegisterForm({ data: formData, userType: userType });

    localDispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await createUser(data, userType); // create user

      if (!response) {
        console.log("No response is found.");
      }

      dispatch(setCurrentUser({ userData: data, userType: userType }));
      dispatch(setIsAuthenticate({ isAuthenticate: true }));

      
      //redirect to dashboard
      navigate("/dashboard");
      
    } catch (error) {
      displayError([error.message]);
    } finally {
      localDispatch({ type: SET_LOADING, payload: false });
    }
  };

  if (loading) {
    return <Loader />; // Loading component
  } else {
    return (
      <form onSubmit={handleSubmit}>
        {error && (
          <PopupMSG
            color={"bg-red-500"}
            errors={
              errorMessages.length > 0 ? errorMessages : "Invalid Credentials"
            }
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
            handleBackForm={handleBackForm}
            error={error}
          />
        )}
      </form>
    );
  }
};

export default Register;
