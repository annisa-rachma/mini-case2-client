import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmationPopup from "../Component/ConfirmationPopup";
import { formatRupiah } from "../store/actions/formatCurrency";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Transfer() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [input, setInput] = useState({
    toAccountNo: "",
    amount: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const toConfirmationPage = (e) => {
    e.preventDefault();
    if(!input.toAccountNo) {
      toast.error("Harap masukkan rekening tujuan", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else  if(!input.amount) {
      toast.error("Harap masukkan nominal transfer", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      navigate(`/transfer/konfirmasi`);

    }
  };

  const submitKonfirmasi = async (event) => {
    try {
      event.preventDefault();
      setShowPopup(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    switch (location.pathname) {
      case "/transfer":
        setCurrentPage("transfer");
        break;
      case "/transfer/konfirmasi":
        setCurrentPage("konfirmasiTransfer");
        break;
      default:
        setCurrentPage("transfer");
    }
  }, [location.pathname]);

  const handleOnClose = () => setShowPopup(false);

  return (
    <div>
      <div>
        <img src="" alt="" />
        <h1 className="text-2xl font-semibold mb-4">Transfer</h1>
      </div>
      <div className="flex justify-between mt-8 gap-8">
        <div className="border-[#1B9ABC] font-semibold text-[#1B9ABC] text-lg text-center border-b-[3px] pt-2 pb-4 flex-1">
          <h1>Antar BNI</h1>
        </div>
        <div className=" text-gray-400 text-lg text-center border-gray-400 border-b-[1px] pt-2 pb-4 flex-1">
          <h1>Antar Bank</h1>
        </div>
      </div>

      {currentPage == "transfer" && (
        <div className="mt-8 flex flex-col">
          <form
            onSubmit={toConfirmationPage}
            className="flex flex-col gap-2 mt-2"
          >
            <div className="flex flex-col">
              <label className="text-lg">Rekening Tujuan</label>
              <input
                onChange={handleChange}
                value={input.toAccountNo}
                name="toAccountNo"
                type="text"
                className="border-black rounded-lg mt-2 border-[1px] p-2 flex-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg">Nominal</label>
              <input
                onChange={handleChange}
                value={input.amount}
                name="amount"
                type="number"
                className="border-black rounded-lg mt-2 border-[1px] p-2 flex-1"
              />
            </div>
            <button
              type="submit"
              className="bg-[#1B9ABC] hover:bg-[#167d99] text-white text-lg font-semibold rounded-lg mt-8  p-3 text-center "
            >
              submit
            </button>
          </form>
        </div>
      )}

      {currentPage == "konfirmasiTransfer" && (
        <>
          <form onSubmit={submitKonfirmasi} className="mt-8 flex flex-col">
            <h1 className="text-lg font-semibold mb-4 text-[#1B9ABC]">
              Konfirmasi
            </h1>

            <div className="flex flex-col gap-4 border-gray-400 border-b-[1px] pb-8">
              <div className="flex flex-row">
                <h1 className="text-lg font-semibold flex-1">
                  Rekening Tujuan
                </h1>
                <p className="text-lg flex-1 font-semibold">
                  {input.toAccountNo}
                </p>
              </div>
              <div className="flex flex-row">
                <h1 className="text-lg font-semibold flex-1">Nama Penerima</h1>
                <p className="text-lg flex-1 font-semibold ">PT DEF</p>
              </div>
              <div className="flex flex-row">
                <h1 className="text-lg flex-1">Bank Tujuan</h1>
                <p className="text-lg flex-1 ">BNI</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <div className="flex flex-row">
                <h1 className="text-lg flex-1">Nama Pengirim</h1>
                <p className="text-lg flex-1">PT ABC</p>
              </div>
              <div className="flex flex-row">
                <h1 className="text-lg flex-1">Rekening Pengirim</h1>
                <p className="text-lg flex-1">9599211230</p>
              </div>
              <div className="flex flex-row">
                <h1 className="text-lg flex-1">Nominal</h1>
                <p className="text-lg flex-1">{formatRupiah(input.amount)}</p>
              </div>
              <div className="flex flex-row">
                <h1 className="text-lg flex-1">Biaya Admin</h1>
                <p className="text-lg flex-1">0</p>
              </div>
              <div className="flex flex-row text-xl mt-4 font-semibold flex-1 p-6 rounded-lg bg-gray-200">
                <h1 className=" flex-1 ">Total</h1>
                <p className=" flex-1 text-[#1B9ABC] font-bold ">
                  {formatRupiah(input.amount)}
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#1B9ABC] hover:bg-[#167d99] text-white text-lg font-semibold rounded-lg mt-8  p-5 text-center "
            >
              Konfirmasi
            </button>
          </form>
          <ConfirmationPopup
            onClose={handleOnClose}
            visible={showPopup}
            inputTransfer={input}
          />
        </>
      )}
    </div>
  );
}
