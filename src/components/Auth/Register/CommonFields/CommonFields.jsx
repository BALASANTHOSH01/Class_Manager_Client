import { InputField } from "../../../ReusableComponents/index";

const CommonFields = ({
  userType,
  handleChange,
  formdata,
  handleUserType,
  formNumber,
  handleFormNumber,
}) => {
  return (
    <div>
      <div>
        <InputField
          name={"name"}
          handlechange={handleChange}
          value={formdata.name}
        />
        <InputField
          name={"email"}
          type={"email"}
          handlechange={handleChange}
          value={formdata.email}
        />
        <InputField
          name={"password"}
          type={"password"}
          handlechange={handleChange}
          value={formdata.password}
        />

        <div className="flex flex-row gap-1">
          <label htmlFor="userType">Account Type:</label>
          <select
            id="userType"
            name="userType"
            className="outline-none border px-[15px]"
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
        </div>

        <button
          type="button"
          onClick={() => handleFormNumber("two")}
          className="px-[10px] py-[5px] bg-[--primary-purpel] text-center text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CommonFields;
