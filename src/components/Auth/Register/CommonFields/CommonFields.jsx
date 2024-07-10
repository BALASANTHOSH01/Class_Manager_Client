import { Link } from "react-router-dom";
import { InputField } from "../../../ReusableComponents/index";

const CommonFields = ({
  userType,
  handleChange,
  formData,
  handleUserType,
  handleFormNumber,
  error
}) => {
  return (
    <div className="w-[500px] py-[2%] px-[2%] border mx-auto mt-[7%]">
      <div className="flex flex-col gap-1 ">
        <h1 className=" font-semibold text-[20px] text-center">Register</h1>

        {/**Name */}
        <InputField
          name="name"
          handlechange={handleChange}
          value={formData.name}
          error={error}
        />

        {/**Email */}
        <InputField
          name="email"
          type="email"
          handlechange={handleChange}
          value={formData.email}
          error={error}
        />

        {/**Password */}
        <InputField
          name="password"
          type="password"
          handlechange={handleChange}
          value={formData.password}
          error={error}
        />

        {/** Select the user type (student,staff,institute) */}
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

        {/** Next button */}
        <button
          type="button"
          onClick={() => handleFormNumber("two")}
          className="px-[5px] py-[8px] w-[100%] cursor-pointer bg-[--primary-purpel] text-center text-white"
        >
          Next
        </button>

        {/**Already have an account */}
        <div className="flex flex-row items-center justify-between my-[1%]">
          <p>Already have an account ?</p>
          <Link
            to="/auth/login"
            className="underline text-[--primary-purpel] font-medium"
          >
            Login
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default CommonFields;
