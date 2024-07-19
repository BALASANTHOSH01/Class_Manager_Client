import { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// reusable input component
import { InputField, PopupMSG } from "../../ReusableComponents/index";

// Login function
import { loginUser } from "../../../api/auth/auth";

// Loader component
import { Loader } from "../../Loader/index.js";

// common reducers
import {
  commonInitialState,
  commonReducer,
} from "../../reducers/commonReducers.js";

// redux part
import {
  setCurrentUser,
  setIsAuthenticate,
} from "../../../features/user/userSlice";

// reducer part
import {
  SET_USER_TYPE,
  loginInitialState,
  loginReducer,
} from "./loginReducers.js";

import { handleError, handleLoading } from "../../../utils/index.js";

import { setToken } from "../../../utils/index.js";

const Login = () => {
  // common actions => (error, errorMessage, loading)
  const [commonState, commonDispatch] = useReducer(
    commonReducer,
    commonInitialState
  );
  const { loading, error, errorMessage } = commonState;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginState, loginDispatch] = useReducer(
    loginReducer,
    loginInitialState
  );
  const { userType } = loginState;

  // login form data
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleUserType = (type) => {
    loginDispatch({ type: SET_USER_TYPE, payload: type });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closePopup = () => {
    //handle error
    handleError(commonDispatch, [], false);
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      handleLoading(commonDispatch, true);

      console.log("login data :"+Object.values(loginData).map((data)=>data));

      const response = await loginUser(loginData, userType);
      if (!response) {
        throw new Error("No response found.");
      }

      // console.log("response token :"+response.data.token);
      localStorage.setItem("authToken", response.data.token);

      if(userType === "staff"){

        // redux current user part
        await dispatch(
          setCurrentUser({
            userData: response.data.staffData,
            userType: userType,
            userId: response.data.staffData._id,
          })
        );

      } else if(userType === "insitute"){

        // redux current user part
        await dispatch(
          setCurrentUser({
            userData: response.data.instituteData,
            userType: userType,
            userId: response.data.instituteData._id,
          })
        );

      } else if(userType === "student"){

        // redux current user part
        await dispatch(
          setCurrentUser({
            userData: response.data.studentData,
            userType: userType,
            userId: response.data.studentData._id,
          })
        );

      }


      // set token
      await setToken(response.data.token);

      // redux user authenticate
      dispatch(setIsAuthenticate({ isAuthenticate: true }));

      //redirect to dashboard
      navigate("/dashboard");
      handleLoading(commonDispatch, true);
    } catch (error) {
      //handle error
      handleError(commonDispatch, error.message, true);
      // handle loading
      handleLoading(commonDispatch, false);
    } finally {
      // handle loading
      handleLoading(commonDispatch, false);
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
            errors={
              errorMessage.length > 0
                ? "Something went wrong"
                : ["Invalid Credentials"]
            }
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
