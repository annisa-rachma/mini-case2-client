import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <>
      <div className="w-full min-h-screen font-sans text-gray-900 bg-gray-50 flex">
        <div className="">
          <Sidebar />
        </div>
        <div className="flex-1 p-12">
          <Outlet />
        </div>
      </div>
    </>
  );
}
