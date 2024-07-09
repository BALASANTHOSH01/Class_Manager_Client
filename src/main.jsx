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
