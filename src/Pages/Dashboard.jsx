import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import AddProductPopup from "../Component/AddProductPopup";
import TableRow from "../Component/TabelRow";
import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../store/actions/actionProduct";

export default function Dashboard() {
  const [showAdd, setShowAdd] = useState(false)
  const [loading, setLoading] = useState(false)
  // const products = useSelector((state) => {
  //   return state.productsReducer.products;
  // });
  // const dispatch = useDispatch();

  // const fetchData = async () => {
  //   try {
  //     setLoading(true)
  //     await dispatch(fetchProducts());
  //   } catch (error) {
  //     console.log(error);
  //   } 
  //   finally {
  //     setLoading(false)
  //   }
  // };

  // useEffect(() => {
  //    fetchData();
  // }, []);

  const handleOnClose = () => setShowAdd(false)
  return (
    <>
      <div className=" grid grid-cols-2 py-8 pl-4 mr-4">
        <div className="text-4xl font-semibold">Data Pegawai</div>
        <div className="grid justify-items-end">
          <div onClick={() => {setShowAdd(true)}} className="border cursor-pointer grid place-content-center border-black py-1 px-5 bg-black text-white hover:bg-[#242424] hover:text-white">
            + Tambah Pegawai
          </div>
        </div>
      </div>
      <div className="mt-8  p-8 pl-4 mr-4 h-[480px] overflow-y-scroll">
        <table className="border-t-[1px] border-black  w-[100%]">
          <thead>
            <tr className="text-left ">
              <th className=" py-3 px-4 border-b-[1px] border-slate-600">NO</th>
              <th className=" py-3 px-4 border-b-[1px] border-slate-600">
                ID
              </th>
              <th className=" py-3 px-4 border-b-[1px] border-slate-600">
                NAMA
              </th>
              <th className=" py-3 px-4 border-b-[1px] border-slate-600">
                KODE CABANG
              </th>
              <th className=" py-3 px-4 border-b-[1px] border-slate-600">
                NAMA CABANG
              </th>
              <th className=" py-3 px-4 border-b-[1px] border-slate-600">
                KODE JABATAN
              </th>
              <th className=" py-3 px-4 border-b-[1px] border-slate-600">
                NAMA JABATAN
              </th>
              <th className=" py-3 px-4 border-b-[1px] border-slate-600 text-gray-50">
                ACTION
              </th>
            </tr>
          </thead>
          {/* <tbody>
            {loading && <tr><td>Loading...</td></tr>  }
            {!loading && products?.map((product, idx) => {
            return <TableRow key={idx} product={product} idx={idx} />;
          })}
          </tbody> */}
        </table>
      </div>

      <AddProductPopup onClose={handleOnClose} visible={showAdd}/>
    </>
  );
}
