// import Logo from "/logo.svg";
import { MdOutlineDashboardCustomize, MdOutlineHome } from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { BiTransferAlt } from "react-icons/bi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import logo from "../assets/logo.png"

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("");


  useEffect(() => {
    // Use a switch statement or if-else if conditions to set currentPage based on pathname
    switch (location.pathname) {
      case "/":
        setCurrentPage("dashboard");
        break;
      default:
        setCurrentPage("/");
    }
  }, [location.pathname]);
  return (
    <>
      <div className="py-6 px-10 w-64 border-r border-gray-200">
        <div className="mt-6">
          <img
            src={logo}
            alt="logo"
            className="w-36 mx-auto "
          />
        </div>

        <div className="flex flex-col gap-y-2 text-gray-500 mt-12 ">
          <div
            className={`w-[100%] h-8 m-auto font-medium mt-4  hover:text-primary  group ${
              currentPage == "dashboard" ? " text-primary " : ""
            }`}
          >
            <Link to={`/`} className="flex-row flex">
              <span className="absolute w-1.5 h-8 bg-primary rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out " />
              <div>
                <MdOutlineDashboardCustomize size="25px" />
              </div>
              <div className="ml-4 grid place-content-center  ">Beranda</div>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
