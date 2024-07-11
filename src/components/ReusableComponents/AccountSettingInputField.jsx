import React from "react";

const AccountSettingInputField = ({
  name,
  handlechange,
  value,
  type,
  error,
  divClass,
  isEditable,
}) => {
  return (
    <div className={`flex flex-row items-center gap-2 my-[4%] justify-center`}>
      <label htmlFor={name} className=" w-[20%] text-[18px] font-medium">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      :
      {isEditable ? (
        <input
          type={type ? type : "text"}
          placeholder={`Enter your ${name}`}
          value={value}
          name={name}
          id={name}
          onChange={handlechange}
          className={`px-[5px] py-[8px] w-[60%] outline-none border ${error ? "border-[2px] border-red-500" : " border-gray-400 "}`}
        />
      ) : (
        <input
        disabled
          type={type ? type : "text"}
          placeholder={`Enter your ${name}`}
          value={value}
          name={name}
          id={name}
          onChange={handlechange}
          className={`px-[5px] py-[8px] w-[60%] outline-none border bg-gray-200 ${error ? "border-[2px] border-red-500" : " border-gray-400 "}`}
        />
      )}
    </div>
  );
};

export default AccountSettingInputField;
