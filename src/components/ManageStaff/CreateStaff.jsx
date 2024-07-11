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
} from "./staffReducers";
import { Loader } from "../Loader";

const CreateStaff = () => {

  const [state, localDispatch] = useReducer(reducer, initialState);
  const { loading, errorMessage, error, staffData } = state;

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

  const handleSubmit = (e) => {
    e.preventDefault();

    localDispatch({ type: SET_LOADING, payload: true });
    const errors = formInputValidation(staffData, "staff");

    if (errors.length > 0) {
      localDispatch({ type: SET_ERROR_MESSAGE, payload: errors });
      localDispatch({ type: SET_ERROR, payload: true });
      localDispatch({ type: SET_LOADING, payload: false });
    } else {
      try {
        // create staff using API
        // console.log("staff name :" + staffData.name);
       
        localDispatch({ type: SET_LOADING, payload: false });
        localDispatch({ type: SET_ERROR, payload: false });
        localDispatch({ type: SET_ERROR_MESSAGE, payload: [] });

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

        <form
          onSubmit={handleSubmit}
          className=" flex flex-row justify-around items-start px-[2%] py-[3%] bg-gray-200 border w-[700px] h-[60vh] mx-auto mt-[6%]"
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
           
            <InputField
              name={"department"}
              handlechange={handleChange}
              value={staffData.department}
              error={error}
            />
          </div>

          <div className=" w-[45%]">
            <InputField
              name={"institute"}
              handlechange={handleChange}
              value={staffData.institute}
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
      </>
    );
  }
};

export default CreateStaff;