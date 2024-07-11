import React, { useReducer } from "react";
import { InputField } from "../ReusableComponents";
import {
  initialState,
  reducer,
  SET_ERROR,
  SET_ERROR_MESSAGE,
  SET_UPDATE_CURRENT_USER,
} from "./accountSetting";

const AccountSetting = () => {
  const [state, localDispatch] = useReducer(reducer, initialState);
  const { currentUserDetails, error, errorMessage } = state;

  
  const handleChange = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div>
        <h1>Account Settings</h1>
        <div>
          <InputField
            name={"name"}
            value={currentUserDetails.name}
            handlechange={handleChange}
            error={error}
          />
          <InputField
            name={"email"}
            type={"email"}
            value={currentUserDetails.email}
            handlechange={handleChange}
            error={error}
          />
          <InputField
            name={"rollno"}
            value={currentUserDetails.rollno}
            handlechange={handleChange}
            error={error}
          />
          <InputField
            name={"phoneNumber"}
            value={currentUserDetails.phoneNumber}
            handlechange={handleChange}
            error={error}
          />
          <InputField
            name={"parentNumber"}
            value={currentUserDetails.parentNumber}
            handlechange={handleChange}
            error={error}
          />
          <InputField
            name={"institute"}
            value={currentUserDetails.institute}
            handlechange={handleChange}
            error={error}
          />
          <InputField
            name={"pincode"}
            value={currentUserDetails.pincode}
            handlechange={handleChange}
            error={error}
          />
          <InputField
            name={"college_code"}
            value={currentUserDetails.college_code}
            handlechange={handleChange}
            error={error}
          />
          <InputField
            name={"department"}
            value={currentUserDetails.department}
            handlechange={handleChange}
            error={error}
          />
          <InputField
            name={"year"}
            value={currentUserDetails.year}
            handlechange={handleChange}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
