import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddBranchPosition from "../Component/AddBranchPosition";
import { fetchPositions } from "../store/actions/actionPosition";
import TableRowPosition from "../Component/TableRowPosition";

export default function Position() {
  const [showAdd, setShowAdd] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  let positions = useSelector((state) => {
    return state.positionReducer.positions;
  });
  const fetchData = async () => {
    try {
      setLoading(true)
      await dispatch(fetchPositions());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleOnClose = () => setShowAdd(false)
  return (
    <>
      <div className=" grid grid-cols-2 py-8 pl-4 mr-4">
        <div className="text-4xl font-semibold text-secondary ">Data Jabatan</div>
        <div className="grid justify-items-end">
          <div onClick={() => {setShowAdd(true)}} className="border cursor-pointer grid place-content-center border-[#1B9ABC] py-1 px-5 bg-[#1B9ABC] rounded-lg text-white hover:bg-[#117d9a] hover:text-white">
            + Tambah Jabatan
          </div>
        </div>
      </div>
      <div className="mt-8  p-8 pl-4 mr-4 h-[480px] w-[1150px] overflow-y-scroll">
        <table className="border-t-[1px] border-[#1B9ABC]  w-[100%]">
          <thead className="">
            <tr className="text-left text-secondary">
              <th className=" py-3 px-4 border-b-[1px] border-[#6ed1ec]">NO</th>
              <th className=" py-3 px-4 border-b-[1px] border-[#6ed1ec]">
                KODE JABATAN
              </th>
              <th className=" py-3 px-4 border-b-[1px] border-[#6ed1ec]">
                NAMA JABATAN
              </th>
              <th className=" py-3 px-4 border-b-[1px] border-[#6ed1ec] text-gray-50">
                ACT
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td>Loading...</td></tr>  }
            {!loading && positions?.map((position, idx) => {
            return <TableRowPosition key={idx} position={position} idx={idx} />;
          })}
          </tbody>
        </table>
      </div>

      <AddBranchPosition onClose={handleOnClose} visible={showAdd}/>
    </>
  );
}
