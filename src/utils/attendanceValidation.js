const attendanceValidation = (attendanceData) => {
  let errors = [];

  
  if (!attendanceData.rollno) errors.push("Student Rollno ");
  if (!attendanceData.status) errors.push("Status ");
  if (!attendanceData.date) errors.push("Date ");
  if (!attendanceData.semester) errors.push("Semester ");
  if (!attendanceData.institute) errors.push("Institute ");

  if(errors.length > 1){
    errors = errors.join(", ");
    return errors+"is required";
  } else {
    return errors
  }

};

export default attendanceValidation;
