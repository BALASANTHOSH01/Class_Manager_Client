import { useReducer } from "react";
import { AccountSettingInputField, Button } from "../ReusableComponents";
import {
  initialState,
  reducer,
  SET_UPDATE_CURRENT_USER,
  SET_IS_EDITABLE,
  SET_DATA_UPDATE,
} from "./accountSettingReducer";
import { useSelector, useDispatch } from "react-redux";
import { filteredRegisterForm } from "../../utils";
import { FiEdit as EditIcon } from "react-icons/fi";
import { updateCurrentUser } from "../../features/user/userSlice";
import { updateInstitute } from "../../api/institute/institute.api";

const AccountSetting = () => {
  // call dispatch
  const dispatch = useDispatch();

  // reducer's initialization
  const [state, localDispatch] = useReducer(reducer, initialState);

  // detstructuring reducer's state value
  const { error, errorMessage, isEdit, currentUserDetails } = state;

  // get existing user Data
  const existingUser = useSelector((state) => state.user.currentUser);

  // get existing user's Id
  const existingUserId = useSelector((state) => state.user.currentUserId);

  // get existsing user Type
  const existingUserType = useSelector((state) => state.user.currentUserType);

  // handles the updating value
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    localDispatch({
      type: SET_UPDATE_CURRENT_USER,
      payload: { name, value },
    });
  };

  // filtering the unwanted fields
  const userNewData = filteredRegisterForm({
    data: currentUserDetails,
    userType: existingUserType,
  });

  const { password, ...withOutPasswordData } = userNewData;

  // set the Data becomes editable
  const handleIsEditable = () => {
    localDispatch({ type: SET_DATA_UPDATE, payload: existingUser });
    localDispatch({ type: SET_IS_EDITABLE, payload: true });
  };

  // save the edited Data
  const saveData = async () => {

    if(existingUserType === "institute"){

      try {
  
        const response = await updateInstitute(withOutPasswordData,existingUserId);

      if(!response){
        console.log("Error updating institute.");
        throw new Error;
      }

      } catch (error) {
        console.log("Error :"+error.message);
        throw new Error;
      }

    }

    // Dispatch the action to update user details
    dispatch(
      updateCurrentUser({
        userData: withOutPasswordData,
        userType: existingUserType,
      })
    );

    localDispatch({ type: SET_IS_EDITABLE, payload: false });
  };

  return (
    <div>
      <div className="my-[4%] ">

        
        <div className=" flex flex-row items-center justify-between px-[5%]">

          {/** Page Heading */}
          <h1 className=" text-[35px] font-semibold ">
            Account Settings
          </h1>

          {/** Edit or Save btn */}
          {isEdit ? (
            <Button
              text={"Save"}
              onClickFunction={saveData}
              className={"text-center w-[100px] bg-[--primary-purpel] text-[23px]  hover:shadow-none text-white"}
            />
          ) : (
            <Button
              icon={<EditIcon />}
              text={"Edit"}
              onClickFunction={handleIsEditable}
              className={"text-center w-[100px] text-[23px] bg-transparent hover:shadow-none"}
            />
          )}
        </div>

        {/** User details fields */}
        <div className="w-[90%] border-[2px] px-[2%] py-[2%] my-[1%] mx-auto">

          {/** Common fields for all type of 'Users' */}
          <AccountSettingInputField
            name={"name"}
            value={isEdit ? currentUserDetails.name : existingUser.name}
            handlechange={handleChange}
            error={error}
            isEditable={isEdit}
          />
          <AccountSettingInputField
            name={"email"}
            type={"email"}
            value={isEdit ? currentUserDetails.email : existingUser.email}
            handlechange={handleChange}
            error={error}
            isEditable={isEdit}
          />

          {/** Student's specific fields */}
          {existingUserType === "student" && (
            <>
              <AccountSettingInputField
                name={"rollno"}
                value={isEdit ? currentUserDetails.rollno : existingUser.rollno}
                handlechange={handleChange}
                error={error}
                isEditable={isEdit}
              />
              <AccountSettingInputField
                name={"department"}
                value={
                  isEdit
                    ? currentUserDetails.department
                    : existingUser.department
                }
                handlechange={handleChange}
                error={error}
                isEditable={isEdit}
              />
              <AccountSettingInputField
                name={"year"}
                value={isEdit ? currentUserDetails.year : existingUser.year}
                handlechange={handleChange}
                error={error}
                isEditable={isEdit}
              />
            </>
          )}

          {/** Students and Staffs specific fields */}
          {(existingUserType === "student" || existingUserType === "staff") && (
            <>
              <AccountSettingInputField
                name={"phoneNumber"}
                value={
                  isEdit
                    ? currentUserDetails.phoneNumber
                    : existingUser.phoneNumber
                }
                handlechange={handleChange}
                error={error}
                isEditable={isEdit}
              />
              <AccountSettingInputField
                name={"parentNumber"}
                value={
                  isEdit
                    ? currentUserDetails.parentNumber
                    : existingUser.parentNumber
                }
                handlechange={handleChange}
                error={error}
                isEditable={isEdit}
              />
              <AccountSettingInputField
                name={"institute"}
                value={
                  isEdit ? currentUserDetails.institute : existingUser.institute
                }
                handlechange={handleChange}
                error={error}
                isEditable={isEdit}
              />
            </>
          )}

          {/** Institute's specific fields */}
          {existingUserType === "institute" && (
            <>
              <AccountSettingInputField
                name={"pincode"}
                value={
                  isEdit ? currentUserDetails.pincode : existingUser.pincode
                }
                handlechange={handleChange}
                error={error}
                isEditable={isEdit}
              />
              <AccountSettingInputField
                name={"college_code"}
                value={
                  isEdit
                    ? currentUserDetails.college_code
                    : existingUser.college_code
                }
                handlechange={handleChange}
                error={error}
                isEditable={isEdit}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
