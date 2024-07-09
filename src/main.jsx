import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Home} from './pages/index.js'
import {Login,Register} from "./components/Auth/index.js";

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/auth/login",
    element:<Login/>
  },
  {
    path:"/auth/register",
    element:<Register/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
  </React.StrictMode>,
)
