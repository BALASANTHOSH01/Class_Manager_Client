import React, { useReducer, useCallback } from "react";
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
import {
  commonInitialState,
  commonReducer,
} from "../reducers/commonReducers";
import useExistingUserData from "../../hooks/useExistingUserData";

const CreateStaff = () => {
  const { existingUser, existingUserType } = useExistingUserData();

  const [commonState, commonDispatch] = useReducer(
    commonReducer,
    commonInitialState
  );
  const { loading, error, errorMessage } = commonState;

  const [staffState, staffDispatch] = useReducer(
    staffReducer,
    staffInitialState
  );
  const { staffData, staffCreated } = staffState;

  const instituteId = getInstituteId(existingUserType, existingUser);

  // Use useCallback to memoize dispatch functions
  const setInstituteId = useCallback(() => {
    staffDispatch({ type: SET_INSTITUTE_ID, payload: instituteId });
  }, [instituteId]);

  // Call the setInstituteId function once
  React.useEffect(() => {
    setInstituteId();
  }, [setInstituteId]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    staffDispatch({
      type: SET_STAFF_DATA,
      payload: { name, value },
    });
  }, []);

  const closePopup = () => {
    handleError(commonDispatch, [], false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrorMessages = formInputValidation(staffData, "staff");

    if (formErrorMessages.length > 0) {
      handleError(commonDispatch, formErrorMessages, true);
      handleLoading(commonDispatch, false);
      return;
    }

    handleLoading(commonDispatch, true);

    try {
      await createStaff(staffData, existingUserType);
      staffDispatch({ type: SET_STAFF_CREATED, payload: true });
      handleError(commonDispatch, [], false);
    } catch (error) {
      handleError(commonDispatch, ["Failed to create staff"], true);
    } finally {
      handleLoading(commonDispatch, false);
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
