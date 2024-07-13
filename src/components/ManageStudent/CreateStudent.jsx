import { useReducer } from "react";
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

  // existing user's Data & Type
  const { existingUser, existingUserType } =
    useExistingUserData();

  // common actions => (error, errorMessage, loading)
  const [commonState, commonDispatch] = useReducer(
    commonReducer,
    commonInitialState
  );
  const { loading, error, errorMessage } = commonState;

  // Student Data
  const [studentState, localDispatch] = useReducer(localReducer, localInitialState);
  const { studentData, studentCreated } = studentState;

  // handle values
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    localDispatch({
      type: SET_STUDENT_DATA,
      payload: { name, value },
    });
  };

  // get user's Institute ID
  const instituteId = getInstituteId(existingUserType, existingUser);

  // close the popup error message
  const closePopup = () => {
    handleError({
      dispatchFuntion: commonDispatch,
      errorMessages: [],
      condition: false,
    });
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // handle Laoding
    handleLoading({ dispatchFunction: commonDispatch, loadingCondition: true });

    // find unfilled data point and give error
    const formErrorMessage = formInputValidation(studentData, "student");

    if (formErrorMessage.length > 0) {
      // handles the form error & errorMessage
      handleError({
        dispatchFuntion: commonDispatch,
        errorMessages: formErrorMessage,
        condition: true,
      });
    } else {
      try {

        // Adding InstituteID with form data
        const studentDataWithInstitute = {
          ...studentData,
          institute: instituteId,
        };

        // create Student
        await createStudent(studentDataWithInstitute, existingUserType);

        // handle Laoding
        handleLoading({
          dispatchFunction: commonDispatch,
          loadingCondition: false,
        });

        // handles the form error & errorMessage
        handleError({
          dispatchFuntion: commonDispatch,
          errorMessages: [],
          condition: false,
        });

        // set student created
        localDispatch({ type: SET_STUDENT_CREATED,payload:true });

        // Optionally reset student data
        localDispatch({ type: RESET_STUDENT_DATA });

      } catch (error) {
        // handles the form error & errorMessage
        handleError({
          dispatchFuntion: commonDispatch,
          errorMessages: ["Failed to create student"],
          condition: true,
        });

        // handle Laoding
        handleLoading({
          dispatchFunction: commonDispatch,
          loadingCondition: false,
        });
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

        {/** student creation form */}
        {studentCreated ? (
          <div className=" text-[50px] text-green-500 mx-auto mt-[20%]">
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
