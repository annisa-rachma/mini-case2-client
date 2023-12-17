import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "../Component/Layout";
import Branch from "../Pages/Branch";
import Dashboard from "../Pages/Dashboard";
import LoginPage from "../Pages/LoginPage";
import Position from "../Pages/Position";

const router = createBrowserRouter([
  {
    element: <Layout />,
    loader : () => {
      if(!localStorage.access_token) {
        return redirect("/login")
      }
      return null
    },
    children : [
        {
            path: "/",
            element: <Dashboard />,
        },
        {
          path: "/cabang",
          element: <Branch />,
        },
        {
          path: "/jabatan",
          element: <Position />,
        },
      ]
  },
  {
    loader : () => {
      if(localStorage.access_token) {
        return redirect("/")
      }
      return null
    },
    children : [
      {
        path : '/login',
        element : <LoginPage/>
      },
    ]
  },
]);

export default router