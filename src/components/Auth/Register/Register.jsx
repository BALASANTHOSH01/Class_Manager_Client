import  { useState } from 'react'
import {CommonFields,DynamicFields} from '../index.js';
import {PopupMSG} from '../../ReusableComponents/index.js';


const Register = () => {

  const [formdata,setFormData]=useState({
    name:"",
    email:"",
    password:"",
    pincode:"",
    college_code:"",
    phoneNumber:"",
    institute:"",
    rollno:"",
    department:"",
    year:0,
  });

  const [userType,setUserType]=useState("");
  const [formNumber,setFormNumber]=useState("one");
  const [error,setError]=useState(false);

  const handleUserType = (type) =>{
    setUserType(type);
  };

  const handleFormNumber = (number) =>{
    if(formdata.name && formdata.email && formdata.password && userType){
      setFormNumber(number);
    } else {
      setError(true);
      return
    }
  };

  const handleChange = (e) =>{
    const {name,value}=e.target;
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }));
  };

  const closePopup = () =>{
    setError(false);
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log("formData :"+formdata);
  };

  return (
    <form onSubmit={handleSubmit}>
      {
        error && <PopupMSG color={"bg-red-500"} value={"error"} closePopup={closePopup} />
      }
      {
        formNumber === "one" && (

          <CommonFields handleChange={handleChange} formdata={formdata} userType={userType} handleUserType={handleUserType} formNumber={formNumber} handleFormNumber={handleFormNumber} />
        )
      }
      {
        formNumber === "two" && (

          <DynamicFields userType={userType} handleChange={handleChange} formdata={formdata} handleSubmit={handleSubmit}/>
        )
      }
    </form>
  )
}

export default Register