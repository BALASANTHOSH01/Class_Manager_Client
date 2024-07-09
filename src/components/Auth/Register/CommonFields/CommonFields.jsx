import { InputField } from "../../../ReusableComponents/index";

const CommonFields = ({ userType, handleChange, formData, handleUserType, handleFormNumber }) => {
  return (
    <div className="w-[500px] py-[2%] px-[2%] border mx-auto my-[8%]">
      <div className="flex flex-col gap-1 ">
        <h1 className=" font-semibold text-[20px] text-center">Register</h1>
        <InputField name="name" handlechange={handleChange} value={formData.name} />
        <InputField name="email" type="email" handlechange={handleChange} value={formData.email} />
        <InputField name="password" type="password" handlechange={handleChange} value={formData.password} />
        <select id="userType" name="userType" className="outline-none px-[5px] py-[8px] my-[2%] cursor-pointer w-[100%] border border-gray-400" value={userType} onChange={(e) => { handleChange(e); handleUserType(e.target.value); }}>
          <option value="" disabled>Select user type</option>
          <option value="institute">Institute</option>
          <option value="staff">Staff</option>
          <option value="student">Student</option>
        </select>
        <button type="button" onClick={() => handleFormNumber("two")} className="px-[5px] py-[8px] w-[100%] cursor-pointer bg-[--primary-purpel] text-center text-white">Next</button>
      </div>
    </div>
  );
};

export default CommonFields;
