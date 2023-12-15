import { useState, useEffect } from "react";
import { LiaWindowCloseSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
// import { handleAddProduct } from "../store/actions/actionProduct";
// import { fetchCategories } from "../store/actions/actionCategory";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateProduct({ visible, onClose }) {
  // const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    mainImg: "",
    categoryId: "",
    imgUrl: [
      {
        imgUrl: "",
      },
    ],
  });
  // let categories = useSelector((state) => {
  //   return state.categoryReducer.categories;
  // });
  // const fetchDataCategories = async () => {
  //   try {
  //     // setLoading(true)
  //     await dispatch(fetchCategories());
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   // finally {
  //   //   setLoading(false)
  //   // }
  // };
  // useEffect(() => {
  //   fetchDataCategories();
  // }, []);

  // const handleAddInput = () => {
  //   if (input.imgUrl.length < 3) {
  //     setInput({
  //       ...input,
  //       imgUrl: [
  //         ...input.imgUrl,
  //         {
  //           imgUrl: "",
  //         },
  //       ],
  //     });
  //   }
  // };
  // const handleRemove = () => {
  //   const updatedImgUrl = input.imgUrl.slice(0, -1);
  //   return setInput({
  //     ...input,
  //     imgUrl: updatedImgUrl,
  //   });
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  // const handleImageChange = (event, idx) => {
  //   const { name, value } = event.target;
  //   let newImages = [...input.imgUrl];
  //   newImages[idx].imgUrl = value;
  //   setInput({
  //     ...input,
  //     imgUrl: newImages,
  //   });
  // };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // await dispatch(handleAddProduct(input));
      console.log("add product success");
      // setInput({
      //   name: "",
      //   description: "",
      //   price: "",
      //   mainImg: "",
      //   categoryId: "",
      //   imgUrl: [
      //     {
      //       imgUrl: "",
      //     },
      //   ],
      // });
      toast.success("Successfully added a new product", {
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
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-[2px] flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-[500px]">
        <div className="flex flex-row justify-between">
            <h1 className="font-semibold text-center text-xl text-[#1B9ABC]">
              Masukkan PIN
            </h1>
            <div className="text-[#1B9ABC]">
              <LiaWindowCloseSolid onClick={onClose} size="25px" className="cursor-pointer hover:bg-slate-100"/>
            </div>

          </div>

          <form onSubmit={handleSubmit} id="form-login" className="">
            <div className="flex flex-col mt-2">
              <input
                type="password"
                value={input.PIN}
                name="PIN"
                onChange={handleChange}
                placeholder="Masukkan PIN..."
                className="w-[100%] h-10 p-6 mt-4 bg-white border border-[#1B9ABC] rounded-lg text-[#1B9ABC] text-md"
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
        </div>
      </div>
    </>
  );
}
