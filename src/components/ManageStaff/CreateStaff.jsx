import { useReducer } from "react";
import { InputField, PopupMSG } from "../ReusableComponents";
import {
  formInputValidation,
  getInstituteId,
  handleError,
  handleLoading,
} from "../../utils";
import {
  staffInitialState,
  staffReducer,
  SET_STAFF_DATA,
  SET_INSTITUTE_ID,
  SET_STAFF_CREATED,
} from "./staffReducers";
import { Loader } from "../Loader";
import { createStaff } from "../../api";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StaffForm from "./StaffForm";
import { commonInitialState, commonReducer } from "../reducers/commonReducers";
import useExistingUserData from "../../hooks/useExistingUserData";

const CreateStaff = () => {

  // existing user's Data & Type
  const { existingUser, existingUserType } =
    useExistingUserData();

  // common actions => ( error, errorMessage, loading )
  const [commonState, commonDispatch] = useReducer(
    commonReducer,
    commonInitialState
  );
  const { loading, error, errorMessage } = commonState;


  const [staffState, staffDispatch] = useReducer(staffReducer, staffInitialState);
  const { staffData, staffCreated } = staffState;

  const instituteId = getInstituteId(existingUserType, existingUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    staffDispatch({
      type: SET_STAFF_DATA,
      payload: { name, value },
    });
  };

  const closePopup = () => {
    handleError({
      dispatchFuntion: commonDispatch,
      errorMessages: [],
      condition: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set institute ID before validation
    staffDispatch({ type: SET_INSTITUTE_ID, payload: instituteId });

    // Validate form data
    const formErrorMessages = formInputValidation(staffData, "staff");

    if (formErrorMessages.length > 0) {
      handleError({
        dispatchFuntion: commonDispatch,
        errorMessages: formErrorMessages,
        condition: true,
      });
      handleLoading({ dispatchFunction: commonDispatch, loadingCondition: false });
      return; // Early exit if validation fails
    }

    handleLoading({ dispatchFunction: commonDispatch, loadingCondition: true });

    try {
      // Create staff using API
      await createStaff(staffData, existingUserType);

      staffDispatch({ type: SET_STAFF_CREATED, payload: true });
      handleError({
        dispatchFuntion: commonDispatch,
        errorMessages: [],
        condition: false,
      });
    } catch (error) {
      handleError({
        dispatchFuntion: commonDispatch,
        errorMessages: ["Failed to create staff"],
        condition: true,
      });
    } finally {
      handleLoading({ dispatchFunction: commonDispatch, loadingCondition: false });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {error && (
        <PopupMSG
          color="bg-red-500"
          errors={errorMessage.length > 0 ? errorMessage : "Invalid Credentials"}
          closePopup={closePopup}
        />
      )}

      {staffCreated ? (
        <div className="text-[50px] text-green-500 mx-auto mt-[20%]">
          <CheckCircleIcon />
        </div>
      ) : (
        <StaffForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          staffData={staffData}
          error={error}
          InputField={InputField}
        />
      )}
    </>
  );
};

export default CreateStaff;
