import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlinePerson2 } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { fetchUser } from "../store/actions/actionUser";
import { formatRupiah } from "../store/actions/formatCurrency";
import { fiturCardData } from "../store/data/fiturCard";
import Carousel from "../Component/Carousel";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/banner4.png";
import FiturCard from "../Component/FiturCard";
import ClipLoader from "react-spinners/ClipLoader";
import bgCard from "../assets/bg-card.png"
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const images = [banner1, banner2, banner3, banner4];

export default function Dashboard() {
  const user = useSelector((store) => store.userReducer);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let [color, setColor] = useState("#ffffff");

  const fetchData = async () => {
    try {
      setLoading(true);
      await dispatch(fetchUser());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(user);
  let fullName = user?.Customer?.firstName + " " + user?.Customer?.lastName;

  const handleVisible = (e) => {
    e.preventDefault();
    setVisible(true);
  };
  const handleHide = (e) => {
    e.preventDefault();
    setVisible(false);
  };

  return (
    <>
      {loading && (
        <>
          <div className="flex justify-center items-center">
            <ClipLoader
              color={color}
              loading={loading}
              cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </>
      )}
      {!loading && (
        <>
          <div className="">
            <div className="flex gap-4 items-center mb-4 ">
              <div className="w-[4rem] h-[4rem] bg-primary rounded-full grid place-content-center text-white">
                <MdOutlinePerson2 size="38px" />
              </div>
              <div>
                <p className="text-gray-500">Selamat Datang,</p>
                <h3 className="text-lg font-medium">{fullName}</h3>
              </div>
            </div>

            <div className="relative">
              <div className="bg-secondary w-full h-[14rem] rounded-xl overflow-hidden ">
                <img src={bgCard} alt="" className="cover" />
              </div>

              <div className="absolute inset-0 p-12 flex flex-col justify-center text-white">
                <div className="flex gap-3 text-4xl font-semibold mt-4">
                  {!visible ? (
                    <>
                      <h1>Rp</h1>
                      <h1>************</h1>
                      <button
                        className="grid place-content-center hover:text-gray-200"
                        onClick={handleVisible}
                      >
                        <FaRegEyeSlash />
                      </button>
                    </>
                  ) : (
                    <>
                      <h1>{formatRupiah(user?.balance)}</h1>
                      <button
                        className="grid place-content-center hover:text-gray-200"
                        onClick={handleHide}
                      >
                        <FaRegEye />
                      </button>
                    </>
                  )}
                </div>
                <div className="mt-4 ">
                  <h2 className="text-2xl ">{user?.accountNo}</h2>
                  <h2 className="text-lg">
                    {user?.accountType?.toUpperCase()}
                  </h2>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between flex-1">
              {fiturCardData.map((el, idx) => (
                <FiturCard key={idx} el={el} />
              ))}
            </div>

            <div className="mt-8">
              <div>
                <h1 className="text-lg font-semibold mb-4">
                  Promo & Informasi
                </h1>
              </div>
              <Carousel>
                {images.map((s, idx) => (
                  <img src={s} alt="" key={idx} className="rounded-xl" />
                ))}
              </Carousel>
            </div>
          </div>
        </>
      )}
    </>
  );
}
