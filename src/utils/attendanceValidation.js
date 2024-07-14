const attendanceValidation = (attendanceData) => {
  let errors = [];

  
  if (!attendanceData.studentRollno) errors.push("Student Rollno ");
  if (!attendanceData.staffName) errors.push("StaffName ");
  if (!attendanceData.status) errors.push("Status ");
  if (!attendanceData.date) errors.push("Date ");
  if (!attendanceData.semester) errors.push("Semester ");
  if (!attendanceData.institute) errors.push("Institute ");

  if(errors.length > 1){
    errors = errors.join(", ");
  }

  return errors+"is required";
};

export default attendanceValidation;
