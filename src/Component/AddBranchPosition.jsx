import { useState, useEffect } from "react";
import { LiaWindowCloseSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleAddBranch } from "../store/actions/actionBranch";
import { handleAddPosition } from "../store/actions/actionPosition";

export default function AddBranchPosition({ visible, onClose }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
  });
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  useEffect(() => {
    // Use a switch statement or if-else if conditions to set currentPage based on pathname
    switch (location.pathname) {
      case "/cabang":
        setCurrentPage("cabang");
        break;
      case "/jabatan":
        setCurrentPage("jabatan");
        break;
      default:
        setCurrentPage("/cabang");
    }
  }, [location.pathname]);

  const handleSubmitBranch = async (event) => {
    try {
      event.preventDefault();
      await dispatch(handleAddBranch(input));
      setInput({
        name: "",
      });
      toast.success("Berhasil menambahkan cabang baru", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      onClose();
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleSubmitPosition = async (event) => {
    try {
      event.preventDefault();
      await dispatch(handleAddPosition(input));
      setInput({
        name: "",
      });
      toast.success("Berhasil menambahkan jabatan baru", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      onClose();
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  if (!visible) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-[2px] flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-[500px]">
          <div className="flex flex-row justify-between">
            <h1 className="font-semibold text-center text-xl text-[#1B9ABC]">
              Masukkan Data {currentPage == "cabang" ? "Cabang" : "Jabatan"}
            </h1>
            <div className="text-[#1B9ABC]">
              <LiaWindowCloseSolid
                onClick={onClose}
                size="25px"
                className="cursor-pointer hover:bg-slate-100"
              />
            </div>
          </div>

          <form
            onSubmit={currentPage == "cabang" ? handleSubmitBranch: handleSubmitPosition }
            id="form-login"
            className="text-[#1B9ABC]"
          >
            <div className="flex flex-col mt-4">
              <label className="">Nama {currentPage == "cabang" ? "Cabang" : "Jabatan"}</label>
              <input
                type="text"
                value={input.name}
                name="name"
                onChange={handleChange}
                placeholder={`Masukkan nama ${currentPage == "cabang" ? "cabang" : "jabatan"}...`}
                className="w-[100%] h-10 p-4 mt-1 bg-white border border-[#1B9ABC] rounded-lg text-[#1B9ABC] text-md"
              />
            </div>

            <div className="w-[100%] grid grid-cols-2 mt-2 gap-2">
              <button
                onClick={onClose}
                type="button"
                className="h-10 mt-6  bg-white text-md text-[#1B9ABC] border border-[#1B9ABC] rounded-lg grid content-center hover:bg-[#1B9ABC] hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="h-10 mt-6  bg-[#1B9ABC] text-md text-white border border-[#1B9ABC] rounded-lg grid content-center hover:bg-[#167d99]hover:text-white"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
