const attendanceValidation = (attendanceData) => {
  let errors = [];

  if (!attendanceData.studentRollno) errors.push("Student Rollno is required.");
  if (!attendanceData.staffName) errors.push("StaffName is required.");
  if (!attendanceData.status) errors.push("Status is required.");
  if (!attendanceData.date) errors.push("Date is required.");
  if (!attendanceData.semester) errors.push("Semester is required.");
  if (!attendanceData.institute) errors.push("Institute is required.");

  return errors;
};

export default attendanceValidation;
