import { useReducer, useState } from "react";
import { InputField, PopupMSG } from "../ReusableComponents";
import { formInputValidation } from "../../utils";
import {
  initialState,
  reducer,
  SET_ERROR,
  SET_ERROR_MESSAGE,
  SET_LOADING,
} from "./studentReducers";
import { Loader } from "../Loader";

const CreateStudent = () => {
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    password: "",
    rollno: "",
    year: 0,
    department: "",
    phoneNumber: "",
    parentNumber: "",
    institute: "",
  });

  const [state, localDispatch] = useReducer(reducer, initialState);
  const { loading, errorMessage, error } = state;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setStudentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closePopup = () =>{
    localDispatch({type: SET_ERROR,payload:false});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    localDispatch({ type: SET_LOADING, payload: true });
    const errors = formInputValidation(studentData, "student");

    if (errors.length > 0) {
      localDispatch({ type: SET_ERROR_MESSAGE, payload: errors });
      localDispatch({ type: SET_ERROR, payload: true });
      setTimeout(() => {
          localDispatch({ type: SET_ERROR, payload: false });
      }, 2000);
      localDispatch({ type: SET_LOADING, payload: false });
    } else {
      try {
        // create student using API
        console.log("student data :"+studentData);

        setStudentData({
          name: "",
          email: "",
          password: "",
          rollno: "",
          year: 0,
          department: "",
          phoneNumber: "",
          parentNumber: "",
          institute: "",
        });

        localDispatch({ type: SET_ERROR, payload: false });
        localDispatch({ type: SET_ERROR_MESSAGE, payload: [] });
      } catch (error) {
        localDispatch({
          type: SET_ERROR_MESSAGE,
          payload: ["Failed to create student"],
        });

        localDispatch({ type: SET_ERROR, payload: true });
      }

      localDispatch({ type: SET_LOADING, payload: false });
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
          </div>

          <div className=" w-[45%]">
            <InputField
              name={"year"}
              handlechange={handleChange}
              value={studentData.year}
              error={error}
            />
            <InputField
              name={"department"}
              handlechange={handleChange}
              value={studentData.department}
              error={error}
            />
            <InputField
              name={"institute"}
              handlechange={handleChange}
              value={studentData.institute}
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
      </>
    );
  }
};

export default CreateStudent;
