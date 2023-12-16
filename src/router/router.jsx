import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "../Component/Layout";
import Dashboard from "../Pages/Dashboard";


const router = createBrowserRouter([
  {
    element: <Layout />,
    // loader : () => {
    //   if(!localStorage.access_token) {
    //     return redirect("/login")
    //   }
    //   return null
    // },
    children : [
        {
            path: "/",
            element: <Dashboard />,
        },
        
        
      ]
  },
  // {
  //   loader : () => {
  //     if(localStorage.access_token) {
  //       return redirect("/")
  //     }
  //     return null
  //   },
  //   children : [
  //     {
  //       path : '/login',
  //       element : <LoginPage/>
  //     },
  //   ]
  // },
]);

export default router