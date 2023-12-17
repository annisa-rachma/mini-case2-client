import { useDispatch } from "react-redux";
// import { handleDeleteProduct } from "../store/actions/actionProduct";
// import ImagesPopup from "./ImagesPopup";
import { useState } from "react";
// import EditProduct from "./EditProductPopup";
import Swal from "sweetalert2";
import { getParsedDate } from "../store/helper/parseDate";
import { formatDate } from "../store/helper/formatDate";
import EditEmployee from "./EditEmployeePopup";
import { handleDeleteEmployee } from "../store/actions/actionEmployee";


export default function TableRow({employee, idx}) {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [editClicked, setEditClicked] = useState(false);

  const handleDelete = () => {
    Swal.fire({
      title: "Apakah anda ingin menghapus data pegawai?",
      text: "Data tidak akan dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1B9ABC",
      cancelButtonColor: "#F15922",
      confirmButtonText: "Ya",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(handleDeleteEmployee(employee.id));
        Swal.fire("Terhapus!", "Data pegawai yang dipilih berhasil dihapus.", "success");
      }
    });
  };
  const handleOnCloseEdit = () => setShowEdit(false);


  const handleShowEdit = () => {
    setShowEdit(true);
    setEditClicked(true);
  };
  
  return (
    <>
      <tr className="text-left ">
        <td className=" py-3 px-4 border-b-[1px]  border-slate-300 ">
          {idx + 1}
        </td>
        <td className=" py-3 px-4 border-b-[1px]  w-[20px]   border-slate-300 ">
          <p className="line-clamp-1">{employee.id}</p>
        </td>
        <td className=" py-3 px-4 border-b-[1px]  border-slate-300 ">
          <p className="w-[100px]">
          {`${employee.firstName} ${employee.lastName}`}

          </p>
        </td>
        <td className=" py-3 px-4 border-b-[1px]  w-[20px]   border-slate-300 ">
          <p className="line-clamp-1">{employee.BranchId}</p>
        </td>
        <td className=" py-3 px-4 border-b-[1px]  border-slate-300 ">
          <p className="w-[100px]">

          {employee.Branch.name}
          </p>
        </td>
        <td className=" py-3 px-4 border-b-[1px]  w-[20px]   border-slate-300 ">
          <p className="line-clamp-1">{employee.PositionId}</p>
        </td>
        <td className=" py-3 px-4 border-b-[1px]  border-slate-300 ">
          {employee.Position.name}
        </td>
        <td className=" py-3 px-4 border-b-[1px]  border-slate-300 ">
          <p className="w-[90px]">
          {getParsedDate(employee.startDate)}
          </p>
        </td>
        <td className=" py-3 px-4 border-b-[1px]  border-slate-300 ">
          <p className="w-[90px]">
          {getParsedDate(employee.endDate)}

          </p>
        </td>
        <td className=" py-3 px-4 border-b-[1px]  border-slate-300 ">
          <div className="flex flex-row gap-4">
            <button
              onClick={handleShowEdit}
              type="button"
              className="grid place-content-start"
            >
              <div className=" bg-[#1B9ABC] py-1 px-3  text-white hover:bg-[#117a97] hover:text-white rounded-lg">
                Edit
              </div>
            </button>
            <button
              onClick={handleDelete}
              type="button"
              className="grid place-content-start"
            >
              <div className=" py-1 px-3 bg-[#F15922] text-white hover:bg-[#d04917] hover:text-white rounded-lg">
                Delete
              </div>
            </button>
          </div>
        </td>
      </tr>
      
      {editClicked && (
        <EditEmployee
          onClose={handleOnCloseEdit}
          visible={showEdit}
          id={employee.id}
        />
      )} 
    </>
  );
}
