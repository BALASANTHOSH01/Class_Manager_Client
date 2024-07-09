import { InputField } from "../../../ReusableComponents";
import { IoChevronBack as BackIcon } from "react-icons/io5";

const DynamicFields = ({ userType, handleChange, formData, setFormNumber }) => {
  return (
    <div className="w-[500px] flex flex-col gap-4 py-[2%] px-[2%] border mx-auto my-[8%]">
      <div className="absolute top-[5%] left-[10%] flex flex-row gap-2 items-center w-[100px] text-center justify-center font-semibold cursor-pointer px-[5px] py-[5px] bg-gray-300" onClick={() => setFormNumber("one")}>
        <BackIcon />
        <p>Back</p>
      </div>
      {(userType === "student" || userType === "staff") && (
        <div>
          <InputField 
          name="phoneNumber" 
          handlechange={handleChange} 
          value={formData.phoneNumber} 
          />
          <InputField name="institute" handlechange={handleChange} value={formData.institute} />
        </div>
      )}
      {userType === "institute" && (
        <div>
          <InputField name="college_code" handlechange={handleChange} value={formData.college_code} />
          <InputField name="pincode" handlechange={handleChange} value={formData.pincode} />
        </div>
      )}
      <button type="submit" className="px-[5px] py-[8px] w-[100%] cursor-pointer bg-[--primary-purpel] text-center text-white">Register</button>
    </div>
  );
};

export default DynamicFields;
