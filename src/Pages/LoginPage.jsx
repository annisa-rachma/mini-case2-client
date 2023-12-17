import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import UserAction from "../store/actions/actionUser";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bgLogin from '../assets/bg-2.jpg'
import { handleLogin } from '../store/actions/actionAdmin';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      await dispatch(handleLogin(input));
      navigate("/");
      toast.success("Berhasil Login", {
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
    <>
      <div className="w-full mx-auto h-[100vh] flex items-center flex-1 justify-center relative">
        <div>
          <img src={bgLogin} className='-z-50 absolute top-[-50rem] left-0 w-full ' />
        </div>
        <div className="">
          <div className="text-secondary text-4xl font-bold">Login</div>

          <form id="form-login" 
          onSubmit={handleSubmit}
           className=" mt-8">
            <div className="flex flex-col mt-2">
              <label className="text-secondary text-lg ">Email</label>
              <input
                type="email"
                value={input.email}
                name="email"
                onChange={handleChange}
                placeholder="Masukkan email..."
                className="w-96 h-12 pl-4 mt-1 bg-white border border-primary rounded-md text-secondary text-lg"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-secondary text-lg">Password</label>
              <input
                type="password"
                value={input.password}
                name="password"
                onChange={handleChange}
                placeholder="Masukkan password..."
                className="w-96 h-12 pl-4 mt-1 bg-white border border-primary rounded-md text-secondary text-lg"
              />
            </div>
            <div className="text-secondary text-md mt-3 flex flex-row justify-between w-96">
              <div>
                <a href="">
                  <div className="hover:underline text-secondary">Lupa password?</div>
                </a>
              </div>
            </div>
            <div className="w-96 h-12 mt-6 bg-secondary text-xl text-white rounded-md grid content-center hover:bg-[#024c60]">
              <button type="submit" className="">
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
