import React, { useReducer } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { InputField, PopupMSG } from "../ReusableComponents";

import {
  handleLoading,
  handleError,
  formInputValidation,
  getInstituteId,
} from "../../utils";

import {
  localInitialState,
  localReducer,
  SET_STUDENT_DATA,
  RESET_STUDENT_DATA,
  SET_STUDENT_CREATED,
} from "./studentReducers";

import {
  commonInitialState,
  commonReducer,
} from "../reducers/commonReducers.js";

import { Loader } from "../Loader";
import { createStudent } from "../../api/student/student.api.js";
import useExistingUserData from "../../hooks/useExistingUserData.jsx";
import StudentForm from "./StudentForm.jsx";

const CreateStudent = () => {
  const { existingUser, existingUserType } = useExistingUserData();
  const [commonState, commonDispatch] = useReducer(
    commonReducer,
    commonInitialState
  );
  const [studentState, localDispatch] = useReducer(
    localReducer,
    localInitialState
  );

  const { loading, error, errorMessage } = commonState;
  const { studentData, studentCreated } = studentState;
  const instituteId = getInstituteId(existingUserType, existingUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    localDispatch({
      type: SET_STUDENT_DATA,
      payload: { name, value },
    });
  };

  const closePopup = () => {
    handleError(commonDispatch, [], false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    handleLoading(commonDispatch, true);
    const errors = formInputValidation(studentData, "student");

    if (errors.length > 0) {
      handleError(commonDispatch, errors, true);
      handleLoading(commonDispatch, false);
      return;
    }

    try {
      const studentDataWithInstitute = {
        ...studentData,
        institute: instituteId,
      };
      await createStudent(studentDataWithInstitute, existingUserType);
      handleLoading(commonDispatch, false);
      handleError(commonDispatch, [], false);
      localDispatch({ type: SET_STUDENT_CREATED, payload: true });
      localDispatch({ type: RESET_STUDENT_DATA });
    } catch (error) {
      handleError(commonDispatch, ["Failed to create student"], true);
      handleLoading(commonDispatch, false);
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
          <div className="text-[50px] text-green-500 mx-auto mt-[20%]">
            <CheckCircleIcon />
          </div>
        ) : (
          <StudentForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            error={error}
            studentData={studentData}
            InputField={InputField}
          />
        )}
      </>
    );
  }
};

export default CreateStudent;
