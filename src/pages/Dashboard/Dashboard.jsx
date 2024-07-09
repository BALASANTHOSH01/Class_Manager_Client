import React from 'react'
import { DashboardNavBar,DashboardSideBar } from '../../components/Dashboard';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
        <div>
          <DashboardNavBar/>
          <DashboardSideBar/>
          <div className='w-[80%] my-[10vh] border h-full absolute right-0 top-0 flex flex-row'>
          <Outlet/>
          </div>
        </div>
    </div>
  )
}

export default Dashboard;