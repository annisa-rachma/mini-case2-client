import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "../Component/Layout";
import Dashboard from "../Pages/Dashboard";
import LoginPage from "../Pages/LoginPage";
import Pembayaran from "../Pages/Pembayaran";
import Riwayat from "../Pages/Riwayat";
import Transfer from "../Pages/Transfer";


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
        {
          path : '/transfer',
          element : <Transfer/>,
          children: [
            {
              path : '/transfer/konfirmasi',
              element : <Transfer/>,
            }

          ]
        },
        {
            path : '/riwayat',
            element : <Riwayat/>
        },
        {
          path : '/pembayaran',
          element : <Pembayaran/>,
          children: [
            {
              path : '/pembayaran/konfirmasi',
              element : <Pembayaran/>,
            }

          ]
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