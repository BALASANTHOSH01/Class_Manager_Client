import { IoSearchCircle as SearchIcon} from "react-icons/io5";
import { PiStudentFill as StudentIcon } from "react-icons/pi";
import { IoPerson as UserIcon } from "react-icons/io5";
import { FaChalkboardTeacher as StaffIcon } from "react-icons/fa";
import { MdEditDocument as AttendanceIcon } from "react-icons/md";
import { SideNavItem } from "../ReusableComponents";
import { MdOutlineLogout as LogoutIcon } from "react-icons/md";
import Logo from "../../../public/CM_logo.png";
import { useSelector } from "react-redux";


const DashboardSideBar = ({isSideNavHovered,setIsSideNavHovered}) => {

  const returnLogo = () =>{
    return <img src={Logo}  alt="logo" className="h-[33px] w-[33px] bg-black rounded-[50%]"/>
  };

  const userType = useSelector((state)=>state.user.currentUserType);

  return (
    <div className={`${isSideNavHovered ? 'w-[20%]' : 'w-[7%] mx-auto'} bg-gray-400 fixed left-0 top-0 flex flex-col gap-2 items-center justify-start h-screen duration-500 overflow-hidden `} onMouseEnter={()=>setIsSideNavHovered(true)} onMouseLeave={()=>setIsSideNavHovered(false)} >

        <SideNavItem icon={returnLogo()} name={isSideNavHovered && "Class Manager"} isSideNavHovered={isSideNavHovered} className={' h-[10vh] hover:bg-transparent'} />

        {
          (userType === "institute" || userType === "staff") && (
            <SideNavItem pageLink={"/dashboard/manage-student"} icon={<StudentIcon/>} name={isSideNavHovered && "Manage Student"} isSideNavHovered={isSideNavHovered} />
          )
        }
       

        {
          userType === 'institute' && (
            <SideNavItem pageLink={"/dashboard/manage-staff"} icon={<StaffIcon/>} name={isSideNavHovered && "Manage Staff"} isSideNavHovered={isSideNavHovered} />
          )
        }

        {
          (userType === "institute" || userType === "staff") && (
            <SideNavItem pageLink={"/dashboard/manage-attendance"} icon={<AttendanceIcon/>} name={isSideNavHovered && "Manage Attendance"} isSideNavHovered={isSideNavHovered} />
          )
        }

        <SideNavItem pageLink={"/dashboard"} icon={<LogoutIcon/>} name={isSideNavHovered && "Logout"} isSideNavHovered={isSideNavHovered} />
    </div>
  )
}

export default DashboardSideBar