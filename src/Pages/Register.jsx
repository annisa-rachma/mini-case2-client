import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// import ConfirmationPopup from "../Component/ConfirmationPopup";
// import { formatRupiah } from "../store/actions/formatCurrency";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleRegister } from "../store/actions/actionAdmin";

export default function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    email: "",
    password: "",
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
      await dispatch(handleRegister(input));
      setInput({
        email: "",
        password: "",
      });
      navigate('/')
      toast.success("Berhasil menambahkan admin baru", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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

  return (
    <div>
      <div className=" grid grid-cols-2 py-8 pl-4 mr-4">
        <div className="text-4xl font-semibold text-secondary ">
          Pendaftaran Admin Baru
        </div>
      </div>

      <div className="mt-8 pl-4 flex flex-col text-[#1B9ABC]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 mt-2"
        >
          <div className="flex flex-col">
            <label className="text-lg">Email</label>
            <input
              onChange={handleChange}
              value={input.email}
              name="email"
              type="email"
              placeholder="Masukkan email..."
              className="border-black rounded-lg mt-2 border-[1px] p-2 flex-1"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="text-lg">Password</label>
            <input
              onChange={handleChange}
              value={input.password}
              name="password"
              type="password"
              placeholder="Masukkan password"
              className="border-black rounded-lg mt-2 border-[1px] p-2 flex-1"
            />
          </div>
          <button
            type="submit"
            className="bg-[#1B9ABC] hover:bg-[#167d99] text-white text-lg font-semibold rounded-lg mt-8  p-3 text-center "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
