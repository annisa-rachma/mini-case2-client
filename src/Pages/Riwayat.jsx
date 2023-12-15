import React, { useEffect, useState, CSSProperties } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { fetchReport } from "../store/actions/actionReport";
import { getParsedDate } from "../store/actions/parseDate";
import { formatRupiah } from "../store/actions/formatCurrency";
import TableRowCategory from "../Component/TableRowCategory";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import { formatDate } from "../store/actions/formatDate";
import ClipLoader from "react-spinners/ClipLoader";
import bgCard from "../assets/bg-card.png"
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Riwayat() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const report = useSelector((store) => store.reportReducer);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const location = useLocation();
  const params = location.search;
  let [color, setColor] = useState("#ffffff");

  // console.log(params, '<<dari page')
  const fetchData = async () => {
    try {
      setLoading(true);
      await dispatch(fetchReport(params));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    const query = `?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
    navigate(`/riwayat${query}`);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setStartDate(new Date());
    setEndDate(new Date());
    navigate(`/riwayat`);
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
          <div className="relative">
            <div className="bg-secondary w-full h-[15.6rem] rounded-xl overflow-hidden ">
              <img src={bgCard} alt="" className="cover" />
            </div>

            <div className="flex justify-center p-8 text-white absolute inset-0">
              <div className="flex gap-4 flex-col w-1/2">
                <div className="">
                  <p className="">Pemilik Rekening</p>
                  <h3 className="text-xl font-semibold">
                    {report?.accountName}
                  </h3>
                </div>
                <div className="">
                  <p className="">Nomor Rekening</p>
                  <h3 className="text-xl font-semibold">{report?.accountNo}</h3>
                </div>
                <div className="">
                  <p className="">Rentang Waktu</p>
                  <h3 className="text-xl font-semibold">{report?.periode}</h3>
                </div>
              </div>
              <div className="flex gap-4 flex-col w-1/2">
                <div className="">
                  <p className="">Tanggal Inquiry</p>
                  <h3 className="text-xl font-semibold">
                    {getParsedDate(report?.tanggalInquiry)}
                  </h3>
                </div>
                <div className="">
                  <p className="">Saldo Awal</p>
                  <h3 className="text-xl font-semibold">
                    {formatRupiah(report?.openingBalance)}
                  </h3>
                </div>
                <div className="">
                  <p className="">Saldo Akhir</p>
                  <h3 className="text-xl font-semibold">
                    {formatRupiah(report?.endingBalance)}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex justify-between gap-4"
          >
            <div className="flex-1">
              <p>Tanggal Awal</p>
              <div className="border-black rounded-lg mt-2 border-[1px] w-full p-2">
                <DatePicker
                  className="w-full"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
            <div className="flex-1">
              <p>Tanggal Akhir</p>
              <div className="border-black rounded-lg mt-2 border-[1px] p-2">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="dd/MM/yyyy"
                  minDate={startDate}
                />
              </div>
            </div>
            <button type="submit" className="w-[8rem]">
              <p className="opacity-0">Tanggal Akhir</p>
              <p className="bg-[#1B9ABC] hover:bg-[#167d99] text-white rounded-lg mt-2  p-2 text-center">
                Filter
              </p>
            </button>
            <button type="button" onClick={handleClear} className="w-[8rem]">
              <p className="opacity-0">Tanggal Akhir</p>
              <p className="bg-white hover:bg-[#1B9ABC] hover:text-white border-[#1B9ABC] border-[1px] text-[#1B9ABC] rounded-lg mt-2  p-2 text-center">
                Clear
              </p>
            </button>
          </form>

          <div className="mt-8">
            <table className="border-t-[1px] border-black  w-[100%]">
              <thead>
                <tr className="text-left ">
                  <th className=" py-3 px-4 border-b-[1px] border-slate-600">
                    TANGGAL
                  </th>
                  <th className=" py-3 px-4 border-b-[1px] border-slate-600">
                    RINCIAN
                  </th>
                  <th className=" py-3 px-4 border-b-[1px] border-slate-600">
                    CATATAN
                  </th>
                  <th className=" py-3 px-4 border-b-[1px] border-slate-600">
                    JUMLAH
                  </th>
                  {/* <th className=" py-3 px-4 border-b-[1px] border-slate-600">
                    ACTION
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {report?.report?.map((el, idx) => {
                  return <TableRowCategory key={idx} el={el} />;
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
