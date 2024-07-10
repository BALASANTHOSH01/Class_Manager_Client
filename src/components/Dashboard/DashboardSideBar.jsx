import { IoSearchCircle as SearchIcon} from "react-icons/io5";
import { PiStudentFill as StudentIcon } from "react-icons/pi";
import { IoPerson as UserIcon } from "react-icons/io5";
import { FaChalkboardTeacher as StaffIcon } from "react-icons/fa";
import { MdEditDocument as AttendanceIcon } from "react-icons/md";
import { SideNavItem } from "../ReusableComponents";
import { MdOutlineLogout as LogoutIcon } from "react-icons/md";
import { useState } from "react";

const DashboardSideBar = ({isSideNavHovered,setIsSideNavHovered}) => {

  return (
    <div className={`${isSideNavHovered ? 'w-[20%]' : 'w-[7%] mx-auto'} bg-gray-400 fixed left-0 top-0 flex flex-col gap-2 items-center justify-start h-screen duration-500 overflow-hidden `} onMouseEnter={()=>setIsSideNavHovered(true)} onMouseLeave={()=>setIsSideNavHovered(false)} >
        <SideNavItem icon={<UserIcon/>} name={isSideNavHovered && "User Name"} isSideNavHovered={isSideNavHovered} />
        <SideNavItem icon={<SearchIcon/>} name={isSideNavHovered && "Search"} isSideNavHovered={isSideNavHovered} />
        <SideNavItem icon={<StudentIcon/>} name={isSideNavHovered && "Manage Student"} isSideNavHovered={isSideNavHovered} />
        <SideNavItem icon={<StaffIcon/>} name={isSideNavHovered && "Manage Staff"} isSideNavHovered={isSideNavHovered} />
        <SideNavItem icon={<AttendanceIcon/>} name={isSideNavHovered && "Manage Attendance"} isSideNavHovered={isSideNavHovered} />
        <SideNavItem icon={<LogoutIcon/>} name={isSideNavHovered && "Logout"} isSideNavHovered={isSideNavHovered} />
    </div>
  )
}

export default DashboardSideBar