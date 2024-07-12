const formInputValidation = (formData, userType) => {
  let errors = [];

  if (userType === "student") {
    if (!formData.name) errors.push("Name is required");
    if (!formData.email) errors.push("Email is required");
    if (!formData.password) errors.push("Password is required");
    if (!formData.rollno) errors.push("Roll number is required");
    if (!formData.department) errors.push("Department is required");
    if (!formData.year) errors.push("Year is required");
    if (!formData.phoneNumber) errors.push("phoneNumber is required");
    if (!formData.parentNumber) errors.push("parentNumber is required");
  } else if (userType === "staff") {
    if (!formData.name) errors.push("Name is required");
    if (!formData.email) errors.push("Email is required");
    if (!formData.password) errors.push("Password is required");
    if (!formData.phoneNumber) errors.push("PhoneNumber is required");
    if (!formData.institute) errors.push("Institute is required");
  } else if (userType === "institute") {
    if (!formData.name) errors.push("Name is required");
    if (!formData.email) errors.push("Email is required");
    if (!formData.password) errors.push("Password is required");
    if (!formData.college_code) errors.push("College Code is required");
    if (!formData.pincode) errors.push("Pincode is required");
  } 

  return errors;
};

export default formInputValidation;
