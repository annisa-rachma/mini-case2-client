import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { handleAddCategory } from "../store/actions/actionCategory";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LiaWindowCloseSolid } from "react-icons/lia";
import { doPayment } from "../store/actions/actionPayment";
import { useLocation, useNavigate } from "react-router-dom";
import { doTransfer } from "../store/actions/actionTransfer";


export default function ConfirmationPopup({ visible, onClose, inputTransfer }) {
  const [input, setInput] = useState({
    PIN: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation();

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
      if(location.pathname == "/pembayaran/konfirmasi") {
        await dispatch(doPayment(input));
      }
      if(location.pathname == "/transfer/konfirmasi") {
        await dispatch(doTransfer(input, inputTransfer));
      }
      setInput({
        PIN: "",
      });
      navigate('/')

        toast.success(location.pathname == "/pembayaran/konfirmasi" ? "Pembayaran berhasil" : "Transfer Berhasil", {
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
      setInput({
        PIN: "",
      });
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
              Masukkan PIN
            </h1>
            <div className="text-[#1B9ABC]">
              <LiaWindowCloseSolid onClick={onClose} size="25px" className="cursor-pointer hover:bg-slate-100"/>
            </div>

          </div>

          <form onSubmit={handleSubmit} id="form-login" className="">
            <div className="flex flex-col mt-2">
              <input
                type="password"
                value={input.PIN}
                name="PIN"
                onChange={handleChange}
                placeholder="Masukkan PIN..."
                className="w-[100%] h-10 p-6 mt-4 bg-white border border-[#1B9ABC] rounded-lg text-[#1B9ABC] text-md"
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
