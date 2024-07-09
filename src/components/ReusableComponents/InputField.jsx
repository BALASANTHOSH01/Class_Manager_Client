const InputField = ({ name, handlechange, value, type }) => {
  return (
    <div className=" flex flex-col gap-1 ">
      <label htmlFor={name}>
        {name.charAt(0).toUpperCase() + name.slice(1)} :
      </label>
      <input
        type={type ? type : "text"}
        placeholder={`Enter your ${name}`}
        value={value}
        name={name}
        id={name}
        onChange={handlechange}
        className=" px-[5px] py-[8px] outline-none border border-gray-400"
      />
    </div>
  );
};

export default InputField;
