import { InputField } from "../../../ReusableComponents";

const DynamicFields = ({ userType, handleChange, formdata, handleSubmit }) => {
  return (
    <div>
      {(userType === "student" || userType === "staff") && (
        <div>
          <InputField
            name={"mobile"}
            handlechange={handleChange}
            value={formdata.phoneNumber}
          />
          <InputField
            name={"institute"}
            handlechange={handleChange}
            value={formdata.institute}
          />
        </div>
      )}

      {userType === "institute" && (
        <div>
          <InputField
            name={"college code"}
            handlechange={handleChange}
            value={formdata.college_code}
          />
          <InputField
            name={"pincode"}
            handlechange={handleChange}
            value={formdata.pincode}
          />
        </div>
      )}

      <button
        type="submit"
        className="px-[10px] py-[5px] bg-[--primary-purpel] text-white cursor-pointer"
      >
        Register
      </button>
      
    </div>
  );
};

export default DynamicFields;
