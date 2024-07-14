const formInputValidation = (formData, userType) => {
  let errors = [];

  if (userType === "student") {
    if (!formData.name) errors.push("Name ");
    if (!formData.email) errors.push("Email ");
    if (!formData.password) errors.push("Password ");
    if (!formData.rollno) errors.push("Roll number ");
    if (!formData.department) errors.push("Department ");
    if (!formData.year) errors.push("Year ");
    if (!formData.phoneNumber) errors.push("phoneNumber ");
    if (!formData.parentNumber) errors.push("parentNumber ");
  } else if (userType === "staff") {
    if (!formData.name) errors.push("Name ");
    if (!formData.email) errors.push("Email ");
    if (!formData.password) errors.push("Password ");
    if (!formData.phoneNumber) errors.push("PhoneNumber ");
    if (!formData.department) errors.push("Department ");
    
  } else if (userType === "institute") {
    if (!formData.name) errors.push("Name ");
    if (!formData.email) errors.push("Email ");
    if (!formData.password) errors.push("Password ");
    if (!formData.college_code) errors.push("College Code ");
    if (!formData.pincode) errors.push("Pincode ");
  } 

  if(errors.length > 1){
    errors = errors.join(", ");
  }

  return errors+"is required";
};

export default formInputValidation;
