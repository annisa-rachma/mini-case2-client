import { useDispatch } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";
import EditEmployee from "./EditEmployeePopup";
import { handleDeleteEmployee } from "../store/actions/actionEmployee";


export default function TableRowBranch({branch, idx}) {
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
        <td className=" py-3 px-4 border-b-[1px]  border-slate-300 ">
          <p className="">{branch.id}</p>
        </td>
        <td className=" py-3 px-4 border-b-[1px]  border-slate-300 ">
          <p className="">{branch.name}</p>
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
