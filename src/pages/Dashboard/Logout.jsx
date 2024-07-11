import React, { useReducer, useState } from 'react'
import Button from "../../components/ReusableComponents/Button";
import { useSelector } from 'react-redux';
import {logout} from "../../features/user/userSlice.js";
import { useDispatch } from 'react-redux';

const Logout = () => {
    const dispatch = useDispatch();
    const [loading,setLoading]=useState(false);

    const handleLogout = () =>{
      setLoading(true);
      setTimeout(() => {
        dispatch(logout());
        setLoading(false);
      }, 1000);
    };

  return (
    <div className=' mx-auto my-[10%]'>
        <div className=' flex flex-col gap-2 text-[20px]'>
            <h1>Are you sure to Logout ?</h1>
            <Button onClickFunction={handleLogout} text={"Logout"} className={"bg-red-500 text-white"} ></Button>
        </div>
    </div>
  )
}

export default Logout;