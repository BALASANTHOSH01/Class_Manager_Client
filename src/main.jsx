import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  DashboardScreen,
  Home,
  StudentManagement,
  StaffManagement,
  AttendanceManagement,
} from "./pages/index.js";
import { Login, Register } from "./components/Auth/index.js";
import { Provider } from "react-redux";
import store from "./app/store.js";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute.jsx";
import StudentProfile from "./components/ManageStudent/StudentProfile.jsx";
import StaffProfile from "./components/ManageStaff/StaffProfile.jsx";
import AttendanceProfile from "./components/ManageAttendance/AttendanceProfile.jsx";
import CreateStudent from "./components/ManageStudent/CreateStudent.jsx";
import CreateStaff from "./components/ManageStaff/CreateStaff.jsx";
import CreateAttendance from "./components/ManageAttendance/CreateAttendance.jsx";
import Logout from "./pages/Dashboard/Logout.jsx";
import AccountSetting from "./components/AccountSetting/AccountSetting.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/account-settings",
    element: <ProtectedRoute element={<AccountSetting />} />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<DashboardScreen />} />,
    children: [
      {
        path: "/dashboard/manage-student",
        element: <ProtectedRoute element={<StudentManagement />} />,
      },
      {
        path: "/dashboard/manage-staff",
        element: <ProtectedRoute element={<StaffManagement />} />,
      },
      {
        path: "/dashboard/manage-attendance",
        element: <ProtectedRoute element={<AttendanceManagement />} />,
      },
      {
        path: "/dashboard/manage-student/:rollno",
        element: <ProtectedRoute element={<StudentProfile />} />,
      },
      {
        path: "/dashboard/manage-staff/:name",
        element: <ProtectedRoute element={<StaffProfile />} />,
      },
      {
        path: "/dashboard/manage-attendance/:studentID",
        element: <ProtectedRoute element={<AttendanceProfile />} />,
      },
      {
        path: "/dashboard/create-student",
        element: <ProtectedRoute element={<CreateStudent />} />,
      },
      {
        path: "/dashboard/create-staff",
        element: <ProtectedRoute element={<CreateStaff />} />,
      },
      {
        path: "/dashboard/create-attendance",
        element: <ProtectedRoute element={<CreateAttendance />} />,
      },
      {
        path: "/dashboard/logout",
        element: <ProtectedRoute element={<Logout />} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </React.StrictMode>
  </Provider>
);
