import { useEffect, useState } from "react";
import AddEmployee from "../Component/AddEmployeePopup";
import TableRow from "../Component/TabelRow";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../store/actions/actionEmployee";

export default function Dashboard() {
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const employees = useSelector((state) => {
    return state.employeeReducer.employees;
  });
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      setLoading(true);
      await dispatch(fetchEmployees());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnClose = () => setShowAdd(false);
  return (
    <>
      <div className=" grid grid-cols-2 py-8 pl-4 mr-4">
        <div className="text-4xl font-semibold text-secondary ">
          Data Pegawai
        </div>
        <div className="grid justify-items-end">
          <div
            onClick={() => {
              setShowAdd(true);
            }}
            className="border cursor-pointer grid place-content-center border-[#1B9ABC] py-1 px-5 bg-[#1B9ABC] rounded-lg text-white hover:bg-[#117d9a] hover:text-white"
          >
            + Tambah Pegawai
          </div>
        </div>
      </div>

      <div className="mt-8  p-8 pl-4 mr-4 h-[480px] w-[1150px] overflow-scroll">
        <table className="border-t-[1px] border-[#1B9ABC]  w-[100%]">
          <thead className="">
            <tr className="text-left text-secondary">
              <th className=" py-3 px-4 border-b-[1px] border-[#6ed1ec]">NO</th>
              <th className=" py-3 px-4 border-b-[1px] border-[#6ed1ec]">ID</th>
              <th className=" py-3 px-4 border-b-[1px] border-[#6ed1ec]">
                NAMA
              </th>
              <th className=" py-3 px-4 border-b-[1px] border-[#6ed1ec]">
                KODE CABANG
              </th>
              <th className=" py-3 px-4 border-b-[1px] border-[#6ed1ec]">
                NAMA CABANG
              </th>
              <th className=" py-3 px-4 border-b-[1px] border-[#6ed1ec]">
                KODE JABATAN
              </th>
              <th className=" py-3 px-4 border-b-[1px] border-[#6ed1ec]">
                NAMA JABATAN
              </th>
              <th className=" py-3 px-4 border-b-[1px] border-[#6ed1ec]">
                MULAI KONTRAK
              </th>
              <th className=" py-3 px-4 border-b-[1px] border-[#6ed1ec]">
                SELESAI KONTRAK
              </th>
              <th className=" py-3 px-4 border-b-[1px] border-[#6ed1ec] text-gray-50">
                ACT
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
            {!loading &&
              employees?.map((employee, idx) => {
                return <TableRow key={idx} employee={employee} idx={idx} />;
              })}
          </tbody>
        </table>
      </div>

      <AddEmployee onClose={handleOnClose} visible={showAdd} />
    </>
  );
}
