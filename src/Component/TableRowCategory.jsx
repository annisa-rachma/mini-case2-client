import { useState } from "react";
import { useDispatch } from "react-redux";
// import { handleDeleteCategory } from "../store/actions/actionCategory";
// import { getParsedDate } from "../store/actions/parseDate";
// import EditCategoryPopup from "./EditCategoryPopup";
import Swal from "sweetalert2";
import { formatRupiah } from "../store/actions/formatCurrency";
import { getParsedDate } from "../store/actions/parseDate";

export default function TableRowCategory({ el }) {
  const [showEdit, setShowEdit] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const handleOnCloseEdit = () => setShowEdit(false);
  const dispatch = useDispatch();
  const handleShowEdit = () => {
    setShowEdit(true);
    setEditClicked(true);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(handleDeleteCategory(category.id));
        Swal.fire("Deleted!", "Your selected category has been deleted.", "success");
      }
    });
  };
  return (
    <>
      <tr className="text-left ">
        <td className=" py-3 px-4 border-b-[1px]  border-slate-300 ">
          {getParsedDate(el.createdAt)}
        </td>
        <td className=" py-3 px-4 border-b-[1px]  border-slate-300 ">
        {el.transactionType} <br />
        {el.transactionType == 'Debet' ? `${el.toAccountNo}` : `${el.fromAccountNo}`}
        </td>
        <td className=" py-3 px-4 border-b-[1px]  border-slate-300 ">
          {el.transactionDetail}
        </td>
        <td className={`py-3 px-4 border-b-[1px]  border-slate-300 ${el.transactionType == 'Debet' ? `text-red-600` : `text-sky-700`}`}>
          {formatRupiah(el.amount)}
        </td>
      </tr>
      
    </>
  );
}
