import { useState, useEffect } from "react";
import { LiaWindowCloseSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { fetchBranches } from "../store/actions/actionBranch";
import { handleAddEmployee } from "../store/actions/actionEmployee";
// import { fetchPositions } from "../store/actions/actionPosition";

export default function AddBranch({ visible, onClose }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // await dispatch(handleAddEmployee(input));
      setInput({
        firstName: "",
        lastName: "",
        BranchId: "",
        PositionId: "",
        startDate: "",
        endDate: "",
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

  if (!visible) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-[2px] flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-[500px]">
          <div className="flex flex-row justify-between">
            <h1 className="font-semibold text-center text-xl text-[#1B9ABC]">
              Masukkan Data Cabang
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
            onSubmit={handleSubmit}
            id="form-login"
            className="text-[#1B9ABC]"
          >
            <div className="flex flex-col mt-4">
              <label className="">Nama Cabang</label>
              <input
                type="text"
                value={input.name}
                name="name"
                onChange={handleChange}
                placeholder="Masukkan nama cabang..."
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
