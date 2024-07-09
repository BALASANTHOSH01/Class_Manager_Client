import { useState } from 'react';
import { CommonFields, DynamicFields } from '../index.js';
import { PopupMSG } from '../../ReusableComponents/index.js';
import {filteredRegisterForm} from '../../../utils/index.js';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    pincode: "",
    college_code: "",
    phoneNumber: "",
    institute: "",
    rollno: "",
    department: "",
    year: 0,
  });

  const [userType, setUserType] = useState("");
  const [formNumber, setFormNumber] = useState("one");
  const [error, setError] = useState(false);

  const handleUserType = (type) => {
    setUserType(type);
  };

  const handleFormNumber = (number) => {
    if (formData.name && formData.email && formData.password && userType) {
      setFormNumber(number);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    
  };

  const closePopup = () => {
    setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = filteredRegisterForm({data:formData,userType:userType});
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <PopupMSG color={"bg-red-500"} value={"All fields are required."} closePopup={closePopup} />}
      {formNumber === "one" && (
        <CommonFields handleChange={handleChange} formData={formData} userType={userType} handleUserType={handleUserType} handleFormNumber={handleFormNumber} />
      )}
      {formNumber === "two" && (
        <DynamicFields userType={userType} handleChange={handleChange} formData={formData} setFormNumber={setFormNumber} />
      )}
    </form>
  );
}

export default Register;
