import { useReducer } from "react";
import { InputField, PopupMSG } from "../ReusableComponents";
import { formInputValidation } from "../../utils";
import {
  initialState,
  reducer,
  SET_ERROR,
  SET_ERROR_MESSAGE,
  SET_LOADING,
  SET_STAFF_DATA,
  SET_INSTITUTE_ID,
  SET_STAFF_CREATED,
} from "./staffReducers";
import { Loader } from "../Loader";
import { createStaff } from "../../api";
import { useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CreateStaff = () => {
  const [state, localDispatch] = useReducer(reducer, initialState);
  const { loading, errorMessage, error, staffData, staffCreated } = state;
  const existingUserType = useSelector((state) => state.user.currentUserType);
  const existingUser = useSelector((state) => state.user.currentUser);

  function getInstituteId() {
    if (existingUserType === "institute") {
      return existingUser._id;
    } else if (existingUserType === "staff") {
      return existingUser.institute;
    }
    return ""; // Ensure to return a default value if no condition matches
  }

  const instituteId = getInstituteId();
  console.log("instituteId : " + instituteId);
  console.log("staffCreated : " + staffCreated);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    localDispatch({
      type: SET_STAFF_DATA,
      payload: { name, value },
    });
  };

  const closePopup = () => {
    localDispatch({ type: SET_ERROR, payload: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    localDispatch({ type: SET_INSTITUTE_ID, payload: instituteId });
    localDispatch({ type: SET_LOADING, payload: true });
    const errors = formInputValidation(staffData, "staff");

    if (errors.length > 0) {
      localDispatch({ type: SET_ERROR_MESSAGE, payload: errors });
      localDispatch({ type: SET_ERROR, payload: true });
      localDispatch({ type: SET_LOADING, payload: false });
    } else {
      try {
        // create staff using API

        await createStaff(staffData, existingUserType);
        localDispatch({ type: SET_LOADING, payload: false });
        localDispatch({ type: SET_ERROR, payload: false });
        localDispatch({ type: SET_ERROR_MESSAGE, payload: [] });
        localDispatch({ type: SET_STAFF_CREATED, payload: true });
      } catch (error) {
        localDispatch({
          type: SET_ERROR_MESSAGE,
          payload: ["Failed to create staff"],
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

        {staffCreated ? (
          <div className=" text-[50px] text-green-500 mx-auto mt-[20%]">
            <CheckCircleIcon />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className=" flex flex-row justify-around items-start px-[2%] py-[3%] bg-gray-200 border w-[700px] h-[50vh] mx-auto mt-[6%]"
          >
            <div className=" w-[45%]">
              <InputField
                name={"name"}
                handlechange={handleChange}
                value={staffData.name}
                error={error}
              />
              <InputField
                name={"email"}
                handlechange={handleChange}
                value={staffData.email}
                type={"email"}
                error={error}
              />
              <InputField
                name={"password"}
                handlechange={handleChange}
                value={staffData.password}
                type={"password"}
                error={error}
              />
            </div>

            <div className=" w-[45%]">
              <InputField
                name={"department"}
                handlechange={handleChange}
                value={staffData.department}
                error={error}
              />
              <InputField
                name={"phoneNumber"}
                handlechange={handleChange}
                value={staffData.phoneNumber}
                error={error}
              />

              <button
                type="submit"
                className="w-[100%] py-[3%] px-[2%] text-center border bg-[--primary-purpel] mt-[9%] text-white"
              >
                Create staff
              </button>
            </div>
          </form>
        )}
      </>
    );
  }
};

export default CreateStaff;
