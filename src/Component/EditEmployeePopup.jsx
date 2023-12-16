import { useState, useEffect } from "react";
import { LiaWindowCloseSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
// import { handleAddProduct } from "../store/actions/actionProduct";
// import { fetchCategories } from "../store/actions/actionCategory";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchBranches } from "../store/actions/actionBranch";
import {
  fetchEmployeeDetail,
  handleAddEmployee,
  handleEditEmployee,
} from "../store/actions/actionEmployee";
import { fetchPositions } from "../store/actions/actionPosition";

export default function EditEmployee({ visible, onClose, id }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    BranchId: "",
    PositionId: "",
    startDate: "",
    endDate: "",
  });

  //fetch details employee
  const employee = useSelector((state) => {
    return state.employeeReducer.employeeById;
  });
  const fetchDetail = async () => {
    try {
      setLoading(true);
      await dispatch(fetchEmployeeDetail(id));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDetail();
  }, [id]);

  //fetch branches
  let branches = useSelector((state) => {
    return state.branchReducer.branches;
  });
  const fetchDataBranches = async () => {
    try {
      await dispatch(fetchBranches());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDataBranches();
  }, []);

  //fetch positions
  let positions = useSelector((state) => {
    return state.positionReducer.positions;
  });
  const fetchDataPositions = async () => {
    try {
      await dispatch(fetchPositions());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDataPositions();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  useEffect(() => {
    setInput({
      firstName: employee?.firstName || "",
      lastName: employee?.lastName || "",
      BranchId: employee?.BranchId || "",
      PositionId: employee?.PositionId || "",
      startDate: employee?.startDate || "",
      endDate: employee?.endDate || "",
    });
  }, [employee]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await dispatch(handleEditEmployee(input, id));
      setInput({
        firstName: "",
        lastName: "",
        BranchId: "",
        PositionId: "",
        startDate: "",
        endDate: "",
      });
      toast.success("Berhasil mengedit data pegawai", {
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
      <>
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-[2px] flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[500px]">
            <div className="flex flex-row justify-between">
              <h1 className="font-semibold text-center text-xl text-[#1B9ABC]">
                Edit Data Pegawai
              </h1>
              <div className="text-[#1B9ABC]">
                <LiaWindowCloseSolid
                  onClick={onClose}
                  size="25px"
                  className="cursor-pointer hover:bg-slate-100"
                />
              </div>
            </div>
            {loading && <p>Loading...</p>}
            {!loading && (
              <>
                <form
                  onSubmit={handleSubmit}
                  id="form-login"
                  className="text-[#1B9ABC]"
                >
                  <div className="flex flex-col mt-2">
                    <label className="">Nama Depan</label>
                    <input
                      type="text"
                      value={input.firstName}
                      name="firstName"
                      onChange={handleChange}
                      placeholder="Masukkan nama depan..."
                      className="w-[100%] h-10 p-4 mt-1 bg-white border border-[#1B9ABC] rounded-lg text-[#1B9ABC] text-md"
                    />
                  </div>
                  <div className="flex flex-col mt-2">
                    <label className="">Nama Belakang</label>
                    <input
                      type="text"
                      value={input.lastName}
                      name="lastName"
                      onChange={handleChange}
                      placeholder="Masukkan nama belakang..."
                      className="w-[100%] h-10 p-4 mt-1 bg-white border border-[#1B9ABC] rounded-lg text-[#1B9ABC] text-md"
                    />
                  </div>
                  <div className="flex flex-col mt-2">
                    <label className="">Cabang</label>
                    <select
                      value={input.BranchId}
                      name="BranchId"
                      id="positions"
                      onChange={handleChange}
                      className="w-[100%] h-10 pl-4 mt-1 bg-white border border-[#1B9ABC] rounded-lg text-[#1B9ABC] text-md"
                    >
                      <option value="" disabled>
                        Pilih Cabang
                      </option>
                      {branches?.map((el) => {
                        return (
                          <option value={el.id} key={el.id}>
                            {el.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="flex flex-col mt-2">
                    <label className="">Jabatan</label>
                    <select
                      value={input.PositionId}
                      name="PositionId"
                      id="positions"
                      onChange={handleChange}
                      className="w-[100%] h-10 pl-4 mt-1 bg-white border border-[#1B9ABC] rounded-lg text-[#1B9ABC] text-md"
                    >
                      <option value="" disabled>
                        Pilih Jabatan
                      </option>
                      {positions?.map((el) => {
                        return (
                          <option value={el.id} key={el.id}>
                            {el.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="flex flex-col mt-2">
                    <label className="">Tanggal Mulai Kontrak</label>
                    <input
                      type="date"
                      value={input.startDate}
                      name="startDate"
                      onChange={handleChange}
                      placeholder="Masukkan nama belakang..."
                      className="w-[100%] h-10 p-4 mt-1 bg-white border border-[#1B9ABC] rounded-lg text-[#1B9ABC] text-md"
                    />
                  </div>
                  <div className="flex flex-col mt-2">
                    <label className="">Tanggal Selesai Kontrak</label>
                    <input
                      type="date"
                      value={input.endDate}
                      name="endDate"
                      onChange={handleChange}
                      placeholder="Masukkan nama belakang..."
                      className="w-[100%] h-10 p-4 mt-1 bg-white border border-[#1B9ABC] rounded-lg text-[#1B9ABC] text-md"
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
              </>
            )}
          </div>
        </div>
      </>
    </>
  );
}
