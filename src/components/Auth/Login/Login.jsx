import { useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// reusable input component
import { InputField, PopupMSG } from "../../ReusableComponents/index";

// Login function
import { loginUser } from "../../../api/auth/auth";

// Loader component
import { Loader } from "../../Loader/index.js";

// redux part
import {
  setCurrentUser,
  setIsAuthenticate,
} from "../../../features/user/userSlice";

// reducer part
import {
  SET_ERROR,
  SET_ERROR_MESSAGE,
  SET_USER_TYPE,
  SET_LOADING,
  reducer,
  initialState,
} from "./loginReducers.js";

import { displayError } from "../../../utils/displayError.js";

const Login = () => {
  const dispatch = useDispatch();
  const [state, localDispatch] = useReducer(reducer, initialState);
  const { userType, error, errorMessage, loading } = state;

  // login form data
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleUserType = (type) => {
    localDispatch({ type: SET_USER_TYPE, payload: type });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closePopup = () => {
    localDispatch({ type: SET_ERROR, payload: false });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      localDispatch({ type: SET_LOADING, payload: true });

      const response = await loginUser(loginData, userType);
      if (!response) {
        throw new Error("No response found.");
      }

      // redux current user part
      await dispatch(
        setCurrentUser({
          userData: response.data.instituteData,
          userType: userType,
        })
      );

      // redux user authenticate
      dispatch(setIsAuthenticate({ isAuthenticate: true }));

    } catch (error) {
      displayError(localDispatch, error.message);
      localDispatch({ type: SET_ERROR_MESSAGE, payload: [error.message] });
      localDispatch({ type: SET_ERROR, payload: true });

      console.log("Error message: " + error.message);
    } finally {
      localDispatch({ type: SET_LOADING, payload: false });
    }
  };

  // const userName = useSelector((state)=>state.user.currentUser?.name);
  // console.log("username: "+userName);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <form
        onSubmit={handleSubmit}
        className="w-[500px] py-[1%] px-[2%] flex flex-col gap-1 border mx-auto my-[8%]"
      >
        {error && (
          <PopupMSG
            color={"bg-red-500"}
            errors={errorMessage.length > 0 ? errorMessage : ["Invalid Credentials"]}
            closePopup={closePopup}
          />
        )}
        <h1 className="font-semibold text-[20px] text-center">Login</h1>

        {/** User Email */}
        <InputField
          type={"email"}
          name={"email"}
          value={loginData.email}
          handlechange={handleChange}
        />

        {/**User Password */}
        <InputField
          type={"password"}
          name={"password"}
          value={loginData.password}
          handlechange={handleChange}
        />

        {/** userType selection */}
        <select
          id="userType"
          name="userType"
          className="outline-none px-[5px] py-[8px] my-[2%] cursor-pointer w-[100%] border border-gray-400"
          value={userType}
          onChange={(e) => {
            handleChange(e);
            handleUserType(e.target.value);
          }}
        >
          <option value="" disabled>
            Select user type
          </option>
          <option value="institute">Institute</option>
          <option value="staff">Staff</option>
          <option value="student">Student</option>
        </select>

        {/**Login button */}
        <button
          type="submit"
          className="px-[5px] py-[8px] w-[100%] cursor-pointer bg-[--primary-purpel] text-center text-white"
        >
          Login
        </button>

        {/** Register form Nav-Link */}
        <div className="flex flex-row items-center justify-between my-[1%]">
          <p>Don&apos;t have an account ?</p>
          <Link
            to="/auth/register"
            className="underline text-[--primary-purpel] font-medium"
          >
            Register
          </Link>
        </div>
      </form>
    );
  }
};

export default Login;
