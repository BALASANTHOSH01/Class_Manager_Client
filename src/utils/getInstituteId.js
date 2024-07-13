function getInstituteId(userType, userData) {
  if (userType === "institute") {
    return userData._id;
  } else if (userType === "staff") {
    return userData.institute;
  }
  return ""; // Ensure to return a default value if no condition matches
}

export default getInstituteId;
