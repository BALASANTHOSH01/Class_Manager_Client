const filteredRegisterForm = ({ data, userType }) => {
  const filteredData = {};

  if (userType === "student") {

    const { name, email, password, phoneNumber,parentNumber, institute, rollno, year, department } = data;
    
    Object.assign(filteredData, { name, email, password, phoneNumber, parentNumber, institute, rollno, year, department });

  } else if (userType === "staff") {

    const { name, email, password, phoneNumber, institute } = data;
    
    Object.assign(filteredData, { name, email, password, phoneNumber, institute });

  } else if (userType === "institute") {

    const { name, email, password, pincode, college_code } = data;
    
    Object.assign(filteredData, { name, email, password, pincode, college_code });

  }

  return filteredData;
};

export default filteredRegisterForm;
