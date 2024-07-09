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
        className=" px-[5px] py-[5px] outline-none border"
      />
    </div>
  );
};

export default InputField;
