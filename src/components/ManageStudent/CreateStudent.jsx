import { useReducer } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { InputField, PopupMSG } from "../ReusableComponents";
import { formInputValidation } from "../../utils";
import {
  initialState,
  reducer,
  SET_ERROR,
  SET_ERROR_MESSAGE,
  SET_LOADING,
  SET_STUDENT_DATA,
  RESET_STUDENT_DATA,
  SET_STUDENT_CREATED,
} from "./studentReducers";
import { Loader } from "../Loader";
import { createStudent } from "../../api/student/student.api.js";
import { useSelector } from "react-redux";

const CreateStudent = () => {

  const [state, localDispatch] = useReducer(reducer, initialState);
  const { loading, errorMessage, error, studentData, studentCreated } = state;
  const existingUserType = useSelector((state) => state.user.currentUserType);
  const existingUser = useSelector((state) => state.user.currentUser);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    localDispatch({
      type: SET_STUDENT_DATA,
      payload: { name, value },
    });
  };

  // console.log("existingUser ID : "+existingUser._id);

  function getInstituteId() {
    if (existingUserType === "institute") {
      return existingUser._id;
    } else if (existingUserType === "staff") {
      return existingUser.institute;
    }
    return ""; // Ensure to return a default value if no condition matches
  }

  const instituteId = getInstituteId();
  // console.log("institute is got it :"+ instituteId);

  const closePopup = () => {
    localDispatch({ type: SET_ERROR, payload: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    localDispatch({ type: SET_LOADING, payload: true });
    const errors = formInputValidation(studentData, "student");

    if (errors.length > 0) {
      localDispatch({ type: SET_ERROR_MESSAGE, payload: errors });
      localDispatch({ type: SET_ERROR, payload: true });
      localDispatch({ type: SET_LOADING, payload: false });
    } else {
      try {
        // Ensure instituteId is included in studentData
        const studentDataWithInstitute = { ...studentData, institute: instituteId };

        await createStudent(studentDataWithInstitute, existingUserType);
        localDispatch({ type: SET_LOADING, payload: false });
        localDispatch({ type: SET_ERROR, payload: false });
        localDispatch({ type: SET_ERROR_MESSAGE, payload: [] });
        localDispatch({ type: SET_STUDENT_CREATED, payload: true });
        // Optionally reset student data
        localDispatch({ type: RESET_STUDENT_DATA });
      } catch (error) {
        console.log("error msg : " + error.message);
        localDispatch({
          type: SET_ERROR_MESSAGE,
          payload: ["Failed to create student"],
        });
        localDispatch({ type: SET_ERROR, payload: true });
        localDispatch({ type: SET_LOADING, payload: false });
      }
    }
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        {error && (
          <PopupMSG
            color={"bg-red-500"}
            errors={
              errorMessage.length > 0 ? errorMessage : "Invalid Credentials"
            }
            closePopup={closePopup}
          />
        )}

        {studentCreated ? (
          <div className=" text-[50px] text-green-500 mx-auto mt-[20%]">
            <CheckCircleIcon />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className=" flex flex-row justify-around items-start px-[2%] py-[3%] bg-gray-200 border w-[700px] h-[70vh] mx-auto mt-[6%]"
          >
            <div className=" w-[45%]">
              <InputField
                name={"name"}
                handlechange={handleChange}
                value={studentData.name}
                error={error}
              />
              <InputField
                name={"email"}
                handlechange={handleChange}
                value={studentData.email}
                type={"email"}
                error={error}
              />
              <InputField
                name={"password"}
                handlechange={handleChange}
                value={studentData.password}
                type={"password"}
                error={error}
              />
              <InputField
                name={"rollno"}
                handlechange={handleChange}
                value={studentData.rollno}
                error={error}
              />
              <InputField
                name={"year"}
                handlechange={handleChange}
                value={studentData.year}
                error={error}
              />
            </div>

            <div className=" w-[45%]">
              <InputField
                name={"department"}
                handlechange={handleChange}
                value={studentData.department}
                error={error}
              />
              <InputField
                name={"phoneNumber"}
                handlechange={handleChange}
                value={studentData.phoneNumber}
                error={error}
              />
              <InputField
                name={"parentNumber"}
                handlechange={handleChange}
                value={studentData.parentNumber}
                error={error}
              />

              <button
                type="submit"
                className="w-[100%] py-[3%] px-[2%] text-center border bg-[--primary-purpel] mt-[9%] text-white"
              >
                Create Student
              </button>
            </div>
          </form>
        )}
      </>
    );
  }
};

export default CreateStudent;
