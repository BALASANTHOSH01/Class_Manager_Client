import { useState } from 'react'
import { DashboardNavBar,DashboardSideBar } from '../../components/Dashboard';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useTokenAutoRefresh from '../../hooks/useTokenAutoRefresh';

const Dashboard = () => {
  useTokenAutoRefresh()
  const [isSideNavHovered,setIsSideNavHovered]=useState(false);
  return (
    <div>
        <div>
          <DashboardNavBar isSideNavHovered={isSideNavHovered} setIsSideNavHovered={setIsSideNavHovered}/>
          <DashboardSideBar isSideNavHovered={isSideNavHovered} setIsSideNavHovered={setIsSideNavHovered}/>

          <div className={` my-[10vh] duration-500  h-full absolute right-0 top-0 flex flex-row ${isSideNavHovered ? "w-[80%]" : "w-[93%]"}`}>
          <Outlet isSideNavHovered={isSideNavHovered} setIsSideNavHovered={setIsSideNavHovered}/>
          </div>

        </div>
    </div>
  )
}

export default Dashboard;