import React, { useState } from 'react';
import { InputField } from '../../ReusableComponents/index';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [userType, setUserType] = useState("");

  const handleUserType = (type) => {
    setUserType(type);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-[500px] py-[2%] px-[2%] flex flex-col gap-1 border mx-auto my-[8%]">
      <h1 className="font-semibold text-[20px] text-center">Login</h1>
      <InputField type={"email"} name={"email"} value={loginData.email} handlechange={handleChange} />
      <InputField type={"password"} name={"password"} value={loginData.password} handlechange={handleChange} />

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
        <option value="" disabled>Select user type</option>
        <option value="institute">Institute</option>
        <option value="staff">Staff</option>
        <option value="student">Student</option>
      </select>
      <button type="submit" className="px-[5px] py-[8px] w-[100%] cursor-pointer bg-[--primary-purpel] text-center text-white">
        Login
      </button>
    </form>
  );
};

export default Login;
