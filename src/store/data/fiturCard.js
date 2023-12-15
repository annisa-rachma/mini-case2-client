import { BiTransferAlt } from "react-icons/bi";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { GoGoal } from "react-icons/go";
import { FaMoneyBill } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

export const fiturCardData = [
  {
    name: "Transfer",
    color: "bg-[#1EB5C8] hover:bg-[#1da4b5]",
    icon: BiTransferAlt,
  },
  {
    name: "Pembayaran",
    color: "bg-[#2570F3] hover:bg-[#2267e0]",
    icon: FaFileInvoiceDollar,
  },
  {
    name: "E-Wallet",
    color: "bg-[#6B59F0] hover:bg-[#5a4ad4]",
    icon: FaWallet,
  },
  {
    name: "Pembelian",
    color: "bg-[#2462F2] hover:bg-[#1f57db]",
    icon: FaShoppingCart,
  },
  {
    name: "Investasi",
    color: "bg-[#06AB6F] hover:bg-[#089662]",
    icon: AiOutlineStock,
  },
  {
    name: "Life Goals",
    color: "bg-[#1EB4C8] hover:bg-[#1c9cad]",
    icon: GoGoal,
  },
  {
    name: "Digital Loan",
    color: "bg-[#EEC133] hover:bg-[#d9b02e]",
    icon: FaMoneyBill,
  },
  {
    name: "Menu Lain",
    color:
      "bg-[#006884]",
    icon: HiOutlineDotsHorizontal,
  },
];