import React, { useState } from 'react'
import { DashboardNavBar,DashboardSideBar } from '../../components/Dashboard';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [isSideNavHovered,setIsSideNavHovered]=useState(false);
  return (
    <div>
        <div>
          <DashboardNavBar isSideNavHovered={isSideNavHovered} setIsSideNavHovered={setIsSideNavHovered}/>
          <DashboardSideBar isSideNavHovered={isSideNavHovered} setIsSideNavHovered={setIsSideNavHovered}/>
          <div className='w-[80%] my-[10vh]  h-full absolute right-0 top-0 flex flex-row'>
          <Outlet/>
          </div>
        </div>
    </div>
  )
}

export default Dashboard;