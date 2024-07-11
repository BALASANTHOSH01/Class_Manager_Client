import { IoSearchCircle as SearchIcon } from "react-icons/io5";
import { IoNotificationsCircleOutline as NotificationIcon } from "react-icons/io5";
import { IoPerson as UserIcon } from "react-icons/io5";
import { Link } from "react-router-dom";

const DashboardNavBar = ({ isSideNavHovered, setIsSideNavHovered }) => {
  return (
    <div
      className={`absolute right-0 top-0 flex flex-row justify-around items-center ${
        isSideNavHovered ? "w-[80%]" : "w-[93%]"
      }  bg-gray-200 h-[10vh] py-[2%] duration-500`}
    >
      <div className="flex flex-col w-[8%]  items-center">
        <p className=" text-[20px] font-medium">1000</p>
        <p className=" text-gray-600">Students</p>
      </div>

      <div className="flex flex-col w-[8%]  items-center">
        <p className=" text-[20px] font-medium">4</p>
        <p className=" text-gray-600">Departments</p>
      </div>

      <div className=" outline-none  overflow-hidden flex flex-row items-center gap-1 bg-white px-[2px] py-[2px] w-[22%] rounded-[25px]">
        <SearchIcon className=" text-[32px]" />
        <input
          type="text"
          placeholder="search ..."
          className=" outline-none bg-transparent w-[95%]"
        />
      </div>

        <NotificationIcon className=" text-[28px] cursor-pointer rounded-[50%] "/>

        <Link to={"/account-settings"}>
        <UserIcon className=" text-[30px] bg-white cursor-pointer p-1 rounded-[50%] hover:bg-gray-100"/>
        </Link>
    
    </div>
  );
};

export default DashboardNavBar;
