import { useReducer } from "react";
import { InputField, PopupMSG } from "../ReusableComponents";
import { formInputValidation } from "../../utils";
import {
  initialState,
  reducer,
  SET_ERROR,
  SET_ERROR_MESSAGE,
  SET_LOADING,
  SET_ATTENDANCE_DATA,
} from "./attendanceReducers";
import { Loader } from "../Loader";
import { attendanceValidation } from "../../utils";

const CreateAttendance = () => {
  const [state, localDispatch] = useReducer(reducer, initialState);
  const { loading, errorMessage, error, attendanceData } = state;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    localDispatch({
      type: SET_ATTENDANCE_DATA,
      payload: { name, value },
    });
  };

  const closePopup = () => {
    localDispatch({ type: SET_ERROR, payload: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localDispatch({ type: SET_LOADING, payload: true });
    const errors = attendanceValidation(attendanceData);

    if (errors.length > 0) {
      localDispatch({ type: SET_ERROR_MESSAGE, payload: errors });
      localDispatch({ type: SET_ERROR, payload: true });
      localDispatch({ type: SET_LOADING, payload: false });
    } else {
      try {
        // create attendance using API
        // console.log("attendance status :" + attendanceData.status);

        localDispatch({ type: SET_LOADING, payload: false });
        localDispatch({ type: SET_ERROR, payload: false });
        localDispatch({ type: SET_ERROR_MESSAGE, payload: [] });
      } catch (error) {
        localDispatch({
          type: SET_ERROR_MESSAGE,
          payload: ["Failed to create attendance"],
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

        <form
          onSubmit={handleSubmit}
          className=" flex flex-row justify-around items-start px-[2%] py-[3%] bg-gray-200 border w-[700px] h-[60vh] mx-auto mt-[6%]"
        >
          <div className=" w-[45%]">
            <InputField
              name={"studentRollno"}
              handlechange={handleChange}
              value={attendanceData.studentRollno}
              error={error}
            />
            <InputField
              name={"staffName"}
              handlechange={handleChange}
              value={attendanceData.staffName}
              error={error}
            />
            <InputField
              name={"date"}
              handlechange={handleChange}
              value={attendanceData.date}
              type={"date"}
              error={error}
            />
            <select 
            id="status"
            name="status"
            className="outline-none px-[5px] py-[8px] my-[2%] mt-[6%] cursor-pointer w-[100%] border border-gray-400"
            value={attendanceData.status}
            onChange={(e) => {
              handleChange(e);
            }}>
              <option value="" disabled>
                Status
              </option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="od/permission">OD / Permission</option>
            </select>

          </div>

          <div className=" w-[45%]">
            <InputField
              name={"semester"}
              handlechange={handleChange}
              value={attendanceData.semester}
              error={error}
            />
            <InputField
              name={"institute"}
              handlechange={handleChange}
              value={attendanceData.institute}
              error={error}
            />

            <button
              type="submit"
              className="w-[100%] py-[3%] px-[2%] text-center border bg-[--primary-purpel] mt-[9%] text-white"
            >
              Create attendance
            </button>
          </div>
        </form>
      </>
    );
  }
};

export default CreateAttendance;
