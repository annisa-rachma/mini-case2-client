import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmationPopup from "../Component/ConfirmationPopup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Pembayaran() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("");
  const [idListrik, setIdListrik] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const toConfirmationPage = (e) => {
    e.preventDefault();
    if(!idListrik) {
      toast.error("Harap masukkan ID Pelanggan", {
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
      navigate(`/pembayaran/konfirmasi`);
    }
  };

  const submitKonfirmasi = async (event) => {
    try {
      event.preventDefault();
      setShowPopup(true);
      setIdListrik("")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    switch (location.pathname) {
      case "/pembayaran":
        setCurrentPage("pembayaran");
        break;
      case "/pembayaran/konfirmasi":
        setCurrentPage("konfirmasi");
        break;
      default:
        setCurrentPage("pembayaran");
    }
  }, [location.pathname]);

  const handleOnClose = () => setShowPopup(false);

  return (
    <div>
      <div>
        <img src="" alt="" />
        <h1 className="text-2xl font-semibold mb-4">Pembayaran Listrik PLN</h1>
      </div>
      <div className="flex justify-between mt-8 gap-8">
        <div className="border-[#1B9ABC] font-semibold text-[#1B9ABC] text-lg text-center border-b-[3px] pt-2 pb-4 flex-1">
          <h1>Tagihan Listrik</h1>
        </div>
        <div className=" text-gray-400 text-lg text-center border-gray-400 border-b-[1px] pt-2 pb-4 flex-1">
          <h1>Token Listrik</h1>
        </div>
      </div>

      {currentPage == "pembayaran" && (
        <div className="mt-8 flex flex-col">
          <h1 className="text-lg font-semibold mb-4 text-[#1B9ABC]">
            Input Nomor
          </h1>
          <h1 className="text-lg">No.Meter / ID Pelanggan</h1>
          <form onSubmit={toConfirmationPage} className="flex gap-2 mt-2">
            <input
              onChange={(e) => setIdListrik(e.target.value)}
              type="number"
              className="border-black rounded-lg mt-2 border-[1px] p-2 flex-1"
            />
            <button
              type="submit"
              className="bg-[#1B9ABC] hover:bg-[#167d99] text-white rounded-lg mt-2  p-2 text-center w-[8rem]"
            >
              submit
            </button>
          </form>
        </div>
      )}

      {currentPage == "konfirmasi" && (
        <>
          <form onSubmit={submitKonfirmasi} className="mt-8 flex flex-col">
            <h1 className="text-lg font-semibold mb-4 text-[#1B9ABC]">
              Konfirmasi
            </h1>

            <div className="flex flex-col gap-4 border-gray-400 border-b-[1px] pb-8">
              <div className="flex flex-row">
                <h1 className="text-lg font-semibold flex-1">
                  No.Meter / ID Pelanggan
                </h1>
                <p className="text-lg flex-1 font-semibold">{idListrik}</p>
              </div>
              <div className="flex flex-row">
                <h1 className="text-lg flex-1">Nama Pelanggan</h1>
                <p className="text-lg flex-1">PT ABC</p>
              </div>
              <div className="flex flex-row">
                <h1 className="text-lg flex-1">Periode Tagihan</h1>
                <p className="text-lg flex-1">1 Bulan</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <div className="flex flex-row">
                <h1 className="text-lg flex-1">Tagihan</h1>
                <p className="text-lg flex-1">RP 5.000.000,00 </p>
              </div>
              <div className="flex flex-row">
                <h1 className="text-lg flex-1">Biaya Admin</h1>
                <p className="text-lg flex-1">Rp 7.500,00</p>
              </div>
              <div className="flex flex-row text-xl mt-4 font-semibold flex-1 p-6 rounded-lg bg-gray-200">
                <h1 className=" flex-1 ">Total Tagihan</h1>
                <p className=" flex-1 text-[#1B9ABC] font-bold ">
                  Rp 5.007.500,00
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
          <ConfirmationPopup onClose={handleOnClose} visible={showPopup} />
        </>
      )}
    </div>
  );
}
